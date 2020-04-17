import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/queue';
import {
    parseISO,
    endOfDay,
    startOfDay,
    isAfter,
    isBefore,
    setSeconds,
    setMinutes,
    setHours,
} from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryController {
    async index(req, res) {
        const { page = 1, q = '' } = req.query;

        const count = await Delivery.count();

        const delivery = await Delivery.findAll({
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'canceled_at',
            ],
            order: ['id'],
            where: { product: { [Op.iLike]: `${q}%` } },
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['name', 'url', 'path'],
                        },
                    ],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'state',
                        'city',
                        'cep',
                        'complements',
                    ],
                },
            ],
            limit: 10,
            offset: (page - 1) * 10,
        });

        res.header('X-Total-Count', count);

        return res.json(delivery);
    }
    async one(req, res) {
        const { id } = req.params;

        const delivery = await Delivery.findByPk(id, {
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'canceled_at',
            ],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['name', 'url', 'path'],
                        },
                    ],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'state',
                        'city',
                        'cep',
                        'complements',
                    ],
                },
            ],
        });

        return res.json(delivery);
    }
    async store(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            recipient_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Field is required' });

        const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
        if (!deliveryman)
            return res.status(404).json({ message: 'Deliveryman not found!' });

        const recipient = await Recipient.findByPk(req.body.recipient_id);
        if (!recipient)
            return res.status(404).json({ message: 'Recipient not found!' });

        let delivery = await Delivery.create(req.body);

        delivery = await Delivery.findByPk(delivery.id, {
            attributes: ['product'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'street',
                        'number',
                        'state',
                        'city',
                        'cep',
                        'complements',
                    ],
                },
            ],
        });

        await Queue.add(DeliveryMail.key, { delivery });

        return res.json(delivery);
    }
    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date(),
            end_date: Yup.date(),
            canceled_at: Yup.date(),
            signature_id: Yup.number().when('end_date', (end_date, field) =>
                end_date ? field.required() : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { canceled_at, start_date, end_date, signature_id } = req.body;

        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery does not exist' });
        }

        if (canceled_at) {
            delivery.canceled_at = canceled_at;
            await delivery.save();

            return res.json(delivery);
        } else if (start_date && !delivery.canceled_at) {
            // Check work time

            const startDate = parseISO(start_date);

            const endDate = parseISO(end_date);

            const startWork = setSeconds(
                setMinutes(setHours(startDate, 8), 0),
                0
            );

            const endWork = setSeconds(setMinutes(setHours(endDate, 18), 0), 0);

            if (isBefore(startDate, startWork) || isAfter(endDate, endWork)) {
                return res.status(400).json({
                    erro: 'The access is only permited between 08:00 and 18:00',
                });
            }

            // Check for past dates

            if (isBefore(startDate, new Date())) {
                return res
                    .status(400)
                    .json({ error: 'Past dates are not permited ' });
            }

            // Check if conclusion date is after start date

            if (isBefore(endDate, startDate)) {
                return res.status(400).json({
                    error: 'Conclusion date must be after start date',
                });
            }

            // Check if deliveryman already pickup 5 deliveries

            const deliveriesDay = await Delivery.findAndCountAll({
                where: {
                    deliveryman_id: delivery.deliveryman_id,
                    start_date: {
                        [Op.between]: [
                            startOfDay(startDate),
                            endOfDay(startDate),
                        ],
                    },
                },
            });

            if (deliveriesDay >= 5)
                return res.status(400).json({
                    error: 'You can pickup at most 5 deliveries per day',
                });

            delivery.start_date = start_date;
            delivery.end_date = end_date;
            delivery.signature_id = signature_id;

            await delivery.save();

            return res.json(delivery);
        }
        return res.status(400).json({ error: 'Invalid option!' });
    }

    async updateAdm(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(404).json({ error: 'Delivery does not exist' });
        }

        delivery.recipient_id = recipient_id;
        delivery.deliveryman_id = deliveryman_id;
        delivery.product = product;

        await delivery.save();

        return res.json(delivery);
    }

    async delete(req, res) {
        const delivery = await Delivery.findByPk(req.params.id);

        if (!delivery)
            return res.status(404).json({ error: 'Delivery not found' });

        const deliveryProblems = await DeliveryProblem.findAll({
            where: { delivery_id: req.params.id },
        });

        if (deliveryProblems)
            await DeliveryProblem.destroy({
                where: { delivery_id: req.params.id },
            });

        await delivery.destroy(req.params.id);

        return res.json({ status: 'Delivery delete with success' });
    }
}

export default new DeliveryController();
