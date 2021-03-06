import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import DeliveryRecipientController from './app/controllers/DeliveryRecipientController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
    return res.json({ ok: true });
});

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipient/:id', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

routes.get('/recipient-delivery/:id', DeliveryRecipientController.index);

//retorna o entregador com as encomendas que não estejam entregues ou canceladas
routes.get('/deliveryman/:id', DeliverymanDeliveryController.index);
//retorna o entregador com as encomendas que já foram entregues por ele
routes.get(
    '/deliveryman/:id/deliveries',
    DeliverymanDeliveryController.deliveries
);
//retorna o entregador e a encomenda especifica
routes.get(
    '/deliveryman/:idDeliveryman/delivery/:idDelivery',
    DeliverymanDeliveryController.delivery
);

//retorna todos os entregadores com o avatar
routes.get('/deliverymanes', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/avatar/:id', FileController.delete);

routes.get('/delivery/:id', DeliveryController.one);
routes.get('/deliveries', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.put('/delivery/:id/adm', DeliveryController.updateAdm);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.post('/signature', upload.single('file'), SignatureController.store);

routes.get('/deliveries/problems', DeliveryProblemController.show);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problem', DeliveryProblemController.store);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
