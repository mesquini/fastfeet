import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';
import * as Yup from 'yup';

class DeliverymanController {
    async index(req, res) {
        const { page = 1 } = req.query;

        if (req.params.id) {
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

            if (req.path.includes('deliveries')) {
                const deliveries_finished = deliveries.filter(
                    d => d.end_date !== null
                );
                return res.json({
                    deliveryman: { name, email, avatar, deliveries_finished },
                });
            }

            const deliveries_available = deliveries.filter(
                d => d.end_date === null
            );

            return res.json({
                deliveryman: { name, email, avatar, deliveries_available },
            });
        }
        const deliverymans = await Deliveryman.findAll({
            attributes: ['id', 'name', 'email'],
            order: ['id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'url', 'path'],
                },
            ],
            limit: 10,
            offset: (page - 1) * 10,
        });

        return res.json(deliverymans);
    }
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const deliverymanExist = await Deliveryman.findOne({
            where: { email: req.body.email },
        });

        if (deliverymanExist)
            return res.status(400).json({ error: 'Email already exist' });

        const deliveryman = await Deliveryman.create(req.body);

        return res.json(deliveryman);
    }
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const { email } = req.body;

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman)
            return res.status(404).json({ error: 'Deliveryman not found' });

        if (email && email !== deliveryman.email) {
            const deliverymanExist = await Deliveryman.findOne({
                where: { email },
            });
            if (deliverymanExist)
                return res.status(400).json({ error: 'Email already exist' });
        }

        const { id, name, avatar_id } = await deliveryman.update(req.body);

        return res.json({ id, name, email, avatar_id });
    }
    async delete(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman)
            return res.status(404).json({ error: 'Deliveryman not found' });

        await deliveryman.destroy();

        return res.json({ ok: 'Deliveryman deleted' });
    }
}

export default new DeliverymanController();
