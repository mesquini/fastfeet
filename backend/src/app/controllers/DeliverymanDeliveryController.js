import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Signature from '../models/Signature';
import { format, parseISO } from 'date-fns';

class DeliverymanDeliveryController {
    async index(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'url', 'path'],
                },
            ],
        });

        if (!deliveryman)
            return res.status(404).json({ message: 'Deliveryman not found!' });

        const { id: deliveryman_id, name, email, avatar } = deliveryman;

        const deliveries = await Delivery.findAll({
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'canceled_at',
            ],
            order: ['id'],
            where: {
                canceled_at: null,
                deliveryman_id,
            },
        });

        const deliveries_available = deliveries.filter(
            d => d.end_date === null
        );

        return res.json({
            deliveryman: { name, email, avatar, deliveries_available },
        });
    }

    async deliveries(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'url', 'path'],
                },
            ],
        });

        if (!deliveryman)
            return res.status(404).json({ message: 'Deliveryman not found' });

        const { id: deliveryman_id, name, email, avatar } = deliveryman;

        const deliveries = await Delivery.findAll({
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'canceled_at',
            ],
            order: ['id'],
            where: {
                canceled_at: null,
                deliveryman_id,
            },
        });

        const deliveries_finished = deliveries.filter(d => d.end_date !== null);
        return res.json({
            deliveryman: { name, email, avatar, deliveries_finished },
        });
    }

    async delivery(req, res) {
        const { idDeliveryman, idDelivery } = req.params;

        const deliveryman = await Deliveryman.findByPk(idDeliveryman);

        if (!deliveryman)
            return res.status(404).json({ message: 'Deliveryman not found!' });

        let delivery = await Delivery.findByPk(idDelivery, {
            include: [
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
            attributes: [
                'id',
                'canceled_at',
                'start_date',
                'end_date',
                'signature_id',
            ],
        });

        if (!delivery)
            return res.status(404).json({ message: 'Delivery not found!' });

        if (delivery.signature_id) {
            const signature = await Signature.findByPk(delivery.signature_id, {
                attributes: ['id', 'url', 'name', 'path'],
            });
            delivery.signature_id = signature;
            return res.json(delivery);
        }

        return res.json(delivery);
    }
}

export default new DeliverymanDeliveryController();
