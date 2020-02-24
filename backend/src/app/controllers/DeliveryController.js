import Delivery from '../models/Delivery';
import * as Yup from 'Yup';

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

        const delivery = await Delivery.create(req.body);

        return res.json(delivery);
    }
    async update(req, res) {}
    async delete(req, res) {}
}

export default new DeliveryController();
