"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var ClienteController_1 = __importDefault(require("../controllers/ClienteController"));
var middleware_1 = require("../middleware/middleware");
var clienteRouter = (0, express_1.Router)();
clienteRouter.get('/', ClienteController_1.default.getAll);
clienteRouter.get('/:code', ClienteController_1.default.getByCode);
clienteRouter.get('/getMatch/tel', ClienteController_1.default.getMatchByTel);
clienteRouter.get('/getMatch/Cod', ClienteController_1.default.getMatchByCod);
clienteRouter.get('/getLastData/code/:code', ClienteController_1.default.getLastDataByCode);
clienteRouter.get('/getLastData/tel/:tel', ClienteController_1.default.getLastDataByTel);
clienteRouter.post('/', [
    (0, express_validator_1.body)('Codigo', 'Debe indicar el codigo del cliente').notEmpty(),
    middleware_1.BodyValidator
], ClienteController_1.default.create);
clienteRouter.put('/:codigo', ClienteController_1.default.update);
clienteRouter.delete('/:id', ClienteController_1.default.delete);
exports.default = clienteRouter;
