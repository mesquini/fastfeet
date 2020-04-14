import * as Yup from 'Yup';
import RecipientModel from '../models/Recipient';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveryRecipient {
    async index(req, res) {
        const { id } = req.params;

        const recipient = await RecipientModel.findByPk(id);

        if (!recipient)
            return res.status(404).json({ error: 'Recipient not found' });

        const deliveriesRecipient = await Delivery.findAll({
            where: { recipient_id: recipient.id },
            attributes: ['id', 'product'],
        });

        return res.json(deliveriesRecipient);
    }
}

export default new DeliveryRecipient();
