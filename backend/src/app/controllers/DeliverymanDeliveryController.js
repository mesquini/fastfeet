import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliverymanDeliveryController {
    async index(req, res) {
        const {
            id: deliveryman_id,
            name,
            email,
            avatar,
        } = await Deliveryman.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'url', 'path'],
                },
            ],
        });

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
        const {
            id: deliveryman_id,
            name,
            email,
            avatar,
        } = await Deliveryman.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'url', 'path'],
                },
            ],
        });

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
}

export default new DeliverymanDeliveryController();
