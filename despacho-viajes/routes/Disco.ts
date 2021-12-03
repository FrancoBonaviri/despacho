import { Router } from 'express'
import { body } from 'express-validator';
import discoController from '../controllers/DiscoController';
import { BodyValidator } from '../middleware/middleware';

const discoRouter = Router();

discoRouter.get('/', [], discoController.getAll);

discoRouter.post('/', [
    body('Titular', 'Debe indicar el titular del disco').notEmpty(),
    body('Numero', 'Debe indicar el numero de disco').notEmpty(),
    body('TelefonoTitular', 'Debe indicar el telefono del titular del disco').notEmpty(),
    body('Marca', 'Debe indicar la marca de disco').notEmpty(),
    body('Modelo', 'Debe indicar el modelo del disco').notEmpty(),
    body('Patente', 'Debe indicar la patente de disco').notEmpty(),
    BodyValidator
], discoController.create);

discoRouter.delete('/:id', [], discoController.delete );

discoRouter.put('/:id', [], discoController.update );




export default discoRouter;