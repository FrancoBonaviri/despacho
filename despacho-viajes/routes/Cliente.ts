import { Router } from 'express'
import { body } from 'express-validator';
import clienteController from '../controllers/ClienteController';
import { BodyValidator } from '../middleware/middleware';



const clienteRouter = Router();


clienteRouter.get('/', clienteController.getAll );

clienteRouter.get('/:code', clienteController.getByCode );


clienteRouter.get('/getMatch/tel', clienteController.getMatchByTel );
clienteRouter.get('/getMatch/Cod', clienteController.getMatchByCod );

clienteRouter.get('/getLastData/code/:code', clienteController.getLastDataByCode );
clienteRouter.get('/getLastData/tel/:tel', clienteController.getLastDataByTel );


clienteRouter.post('/',[
    body('Codigo', 'Debe indicar el codigo del cliente').notEmpty(),
    BodyValidator
] ,clienteController.create);

clienteRouter.put('/:codigo', clienteController.update)

export default clienteRouter;