"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var DiscoController_1 = __importDefault(require("../controllers/DiscoController"));
var middleware_1 = require("../middleware/middleware");
var discoRouter = (0, express_1.Router)();
discoRouter.get('/', [], DiscoController_1.default.getAll);
discoRouter.post('/', [
    (0, express_validator_1.body)('Titular', 'Debe indicar el titular del disco').notEmpty(),
    (0, express_validator_1.body)('Numero', 'Debe indicar el numero de disco').notEmpty(),
    (0, express_validator_1.body)('TelefonoTitular', 'Debe indicar el telefono del titular del disco').notEmpty(),
    (0, express_validator_1.body)('Marca', 'Debe indicar la marca de disco').notEmpty(),
    (0, express_validator_1.body)('Modelo', 'Debe indicar el modelo del disco').notEmpty(),
    (0, express_validator_1.body)('Patente', 'Debe indicar la patente de disco').notEmpty(),
    middleware_1.BodyValidator
], DiscoController_1.default.create);
discoRouter.delete('/:id', [], DiscoController_1.default.delete);
discoRouter.put('/:id', [], DiscoController_1.default.update);
exports.default = discoRouter;
