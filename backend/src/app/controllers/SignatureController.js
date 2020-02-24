import Signature from '../models/Signature';
import Delivery from '../models/Delivery';

class SignatureController {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;

        const delivery = await Delivery.findByPk(req.params.id);

        const signature = await Signature.create({ name, path });

        await delivery.update({
            signature_id: signature.id,
            end_date: new Date(),
        });

        return res.json(signature);
    }
}

export default new SignatureController();
