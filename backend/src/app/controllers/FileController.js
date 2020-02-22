import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class FileController {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            path,
        });

        await Deliveryman.update(
            { avatar_id: file.id },
            {
                where: { id: req.params.id },
            }
        );

        return res.json(file);
    }

    async delete(req, res) {
        const file = await File.findByPk(req.params.id);

        const deliveryman = await Deliveryman.findOne({
            where: { avatar_id: file.id },
        });

        if (deliveryman) {
            await file.destroy();
            await deliveryman.update({ avatar_id: 0 });
            return res.json({ ok: 'Image removed' });
        }

        await file.destroy();

        return res.json({ ok: 'Image removed' });
    }
}

export default new FileController();
