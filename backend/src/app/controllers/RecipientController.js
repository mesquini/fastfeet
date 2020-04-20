import * as Yup from 'Yup';
import RecipientModel from '../models/Recipient';
import { Op } from 'sequelize';

class Recipient {
    async index(req, res) {
        if (req.params.id) {
            const recipient = await RecipientModel.findByPk(req.params.id);
            if (!recipient)
                return res.status(404).json({ error: 'Recipient not found' });

            return res.json(recipient);
        } else {
            const { page = 1, q = '' } = req.query;

            const count = await RecipientModel.count();

            const recipients = await RecipientModel.findAll({
                order: ['id'],
                where: { street: { [Op.iLike]: `${q}%` } },
                limit: 10,
                offset: (page - 1) * 10,
            });

            res.header('X-Total-Count', count);

            return res.json(recipients);
        }
    }
    async store(req, res) {
        const shema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
            complements: Yup.string(),
        });

        if (!(await shema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const recipient = await RecipientModel.create(req.body);

        return res.json(recipient);
    }
    async update(req, res) {
        const shema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
            complements: Yup.string(),
        });

        if (!(await shema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const recipient = await RecipientModel.findByPk(req.params.id);

        if (!recipient)
            return res.status(404).json({ error: 'Recipient not found' });

        const {
            name,
            street,
            number,
            state,
            city,
            cep,
            complements,
        } = await recipient.update(req.body);

        return res.json({
            name,
            street,
            number,
            state,
            city,
            cep,
            complements,
        });
    }
    async delete(req, res) {
        const recipient = await RecipientModel.findByPk(req.params.id);

        if (!recipient)
            return res.status(404).json({ error: 'Recipient not found' });

        await recipient.destroy(req.params.id);

        return res.json({ status: 'Recipient delete with success' });
    }
}

export default new Recipient();
