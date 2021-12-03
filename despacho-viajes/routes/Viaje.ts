import { Router } from 'express'
import viajeController from '../controllers/ViajeController';
import { body } from 'express-validator'; 
import { BodyValidator, ValidCreateViaje } from '../middleware/middleware';


const viajeRouter = Router();

viajeRouter.get('/:state', [], viajeController.getAll);


viajeRouter.get('/byid/:id', [], viajeController.getbyId);


viajeRouter.post('/', [
    body('Calle', 'Debe indicar la calle').notEmpty(),
    body('Numero', 'Debe indicar el numero').notEmpty(),
    body('Localidad', 'Debe indicar la localidad').notEmpty(),
    BodyValidator,
    ValidCreateViaje
], viajeController.create);

viajeRouter.post('/Reservar', [
    body('Calle', 'Debe indicar la calle').notEmpty(),
    body('Numero', 'Debe indicar el numero').notEmpty(),
    body('Localidad', 'Debe indicar la localidad').notEmpty(),
    body('FechaReserva', 'Debe indicar la fecha de la reserva').notEmpty(),
    body('MinutosAntesReserva', 'Debe indicar los minutos previos a la reserva').isNumeric(),
    BodyValidator,
    ValidCreateViaje
], viajeController.createReserva);


viajeRouter.put('/', [], viajeController.confirm);

viajeRouter.put('/:id', [], viajeController.completar);


viajeRouter.put('/update/:id', [], viajeController.update);
viajeRouter.put('/updateDisco/:id', [], viajeController.cambiarDisco);


viajeRouter.delete('/:id', [], viajeController.delete);



export default viajeRouter;