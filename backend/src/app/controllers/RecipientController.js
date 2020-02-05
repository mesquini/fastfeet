import * as Yup from 'Yup';

import RecipientModel from '../models/Recipient';

class Recipient {
    async index(req, res) {
        const { id } = req.body;

        if (id) {
            const recipient = await RecipientModel.findByPk(id);

            return res.json(recipient);
        }

        const recipients = await RecipientModel.findAll();

        return res.json(recipients);
    }
    async store(req, res) {
        const shema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await shema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const {
            name,
            street,
            number,
            state,
            city,
            cep,
            complements,
        } = await RecipientModel.create(req.body);

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
    async update(req, res) {
        const shema = Yup.object().shape({
            name: Yup.string(),
            street: Yup.string(),
            number: Yup.number(),
            state: Yup.string(),
            city: Yup.string(),
            cep: Yup.string(),
        });

        if (!(await shema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const recipient = await RecipientModel.findByPk(req.params.id);
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
            return res.status(401).json({ error: 'Recipient not found' });

        await recipient.destroy(req.params.id);

        return res.json({ status: 'Recipient delete with success' });
    }
}

export default new Recipient();
