import { Router } from 'express'
import { body } from 'express-validator';
import choferController from '../controllers/ChoferController';
import { BodyValidator } from '../middleware/middleware';

const choferRouter = Router();

choferRouter.get('/', [], choferController.getAll);


choferRouter.get('/dispo/:dispo', [], choferController.isValidDispo );

choferRouter.get('/msg/:disco', [], choferController.getPrevMessages );

choferRouter.post('/', [
    body('Nombre', 'Debe indicar el nombre del chofer').notEmpty(),
    body('Telefono', 'Debe indicar el telefono del chofer').notEmpty(),
    body('NumeroDiscos', 'Debe indicar el el numero de disco del chofer').notEmpty(),
    BodyValidator
], choferController.create);

choferRouter.delete('/:id', [], choferController.delete );

choferRouter.put('/:id', [], choferController.update );

choferRouter.put('/uploadDoc/:id', [], choferController.uploadDoc );




export default choferRouter;