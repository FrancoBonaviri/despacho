"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ViajeController_1 = __importDefault(require("../controllers/ViajeController"));
var express_validator_1 = require("express-validator");
var middleware_1 = require("../middleware/middleware");
var viajeRouter = (0, express_1.Router)();
viajeRouter.get('/:state', [], ViajeController_1.default.getAll);
viajeRouter.get('/byid/:id', [], ViajeController_1.default.getbyId);
viajeRouter.post('/', [
    (0, express_validator_1.body)('Calle', 'Debe indicar la calle').notEmpty(),
    (0, express_validator_1.body)('Numero', 'Debe indicar el numero').notEmpty(),
    (0, express_validator_1.body)('Localidad', 'Debe indicar la localidad').notEmpty(),
    middleware_1.BodyValidator,
    middleware_1.ValidCreateViaje
], ViajeController_1.default.create);
viajeRouter.post('/Reservar', [
    (0, express_validator_1.body)('Calle', 'Debe indicar la calle').notEmpty(),
    (0, express_validator_1.body)('Numero', 'Debe indicar el numero').notEmpty(),
    (0, express_validator_1.body)('Localidad', 'Debe indicar la localidad').notEmpty(),
    (0, express_validator_1.body)('FechaReserva', 'Debe indicar la fecha de la reserva').notEmpty(),
    (0, express_validator_1.body)('MinutosAntesReserva', 'Debe indicar los minutos previos a la reserva').isNumeric(),
    middleware_1.BodyValidator,
    middleware_1.ValidCreateViaje
], ViajeController_1.default.createReserva);
viajeRouter.put('/', [], ViajeController_1.default.confirm);
viajeRouter.put('/:id', [], ViajeController_1.default.completar);
viajeRouter.put('/update/:id', [], ViajeController_1.default.update);
viajeRouter.put('/updateDisco/:id', [], ViajeController_1.default.cambiarDisco);
viajeRouter.delete('/:id', [], ViajeController_1.default.delete);
exports.default = viajeRouter;
