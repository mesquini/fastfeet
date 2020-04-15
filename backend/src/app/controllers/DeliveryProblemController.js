import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/queue';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
    async show(req, res) {
        const { page = 1 } = req.query;

        const deliveryProblem = await DeliveryProblem.findAll({
            order: ['id'],
            include: [{ model: Delivery, as: 'delivery', order: ['id'] }],
            limit: 10,
            offset: (page - 1) * 10,
        });

        return res.json(deliveryProblem);
    }
    async index(req, res) {
        const deliveryProblem = await DeliveryProblem.findByPk(req.params.id);

        if (!deliveryProblem)
            return res
                .status(404)
                .json({ error: 'Delivery problem not found' });

        return res.json(deliveryProblem);
    }
    async store(req, res) {
        const shema = Yup.object().shape({
            description: Yup.string().required(),
            delivery_id: Yup.number().required(),
        });

        const { description } = req.body;
        const { id: delivery_id } = req.params;

        if (
            !(await shema.isValid({
                description,
                delivery_id,
            }))
        )
            return res.status(400).json({ error: 'Validation fails' });

        const deliveryProblem = await DeliveryProblem.create({
            description,
            delivery_id,
        });

        return res.json(deliveryProblem);
    }
    async delete(req, res) {
        const deliveryProblem = await DeliveryProblem.findByPk(req.params.id, {
            attributes: ['id', 'description'],
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: ['id', 'product'],
                    include: [
                        {
                            model: Deliveryman,
                            as: 'deliveryman',
                            attributes: ['id', 'name', 'email'],
                        },
                    ],
                },
            ],
        });

        if (!deliveryProblem)
            return res
                .status(404)
                .json({ error: 'Delivery problem not found' });

        const delivery = await Delivery.findByPk(deliveryProblem.delivery.id);

        if (!delivery)
            return res.status(400).json({ error: 'Delivery not found' });

        let cancelDate = !!req.body.canceled_at
            ? req.body.canceled_at
            : new Date();
        delivery.canceled_at = parseISO(cancelDate);

        await delivery.save();

        await Queue.add(CancellationMail.key, { deliveryProblem });

        return res.json(deliveryProblem);
    }
}

export default new DeliveryProblemController();
