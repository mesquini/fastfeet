import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/queue';
import DeliveryMail from '../jobs/DeliveryMail';
import * as Yup from 'Yup';
import Recipient from '../models/Recipient';

class DeliveryController {
    async index(req, res) {}
    async store(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            recipient_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Field is required' });

        let delivery = await Delivery.create(req.body);

        delivery = await Delivery.findByPk(delivery.id, {
            attributes: ['product'],
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['name', 'email'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
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

        await Queue.add(DeliveryMail.key, { delivery })

        return res.json(delivery);
    }
    async update(req, res) {
        const { canceled_at, start_date } = req.body;

        const delivery = await Delivery.findByPk(req.params.id);

        if (canceled_at) {
            delivery.canceled_at = new Date();
            await delivery.save();

            return res.json(delivery);
        } else if (start_date) {
            delivery.start_date = new Date();
            await delivery.save();

            return res.json(delivery);
        }
    }
    async delete(req, res) {}
}

export default new DeliveryController();
