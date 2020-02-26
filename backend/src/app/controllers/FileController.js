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

        await file.destroy();

        return res.json({ ok: 'Image removed' });
    }
}

export default new FileController();
