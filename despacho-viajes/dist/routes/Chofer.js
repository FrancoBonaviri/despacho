"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var ChoferController_1 = __importDefault(require("../controllers/ChoferController"));
var middleware_1 = require("../middleware/middleware");
var choferRouter = (0, express_1.Router)();
choferRouter.get('/', [], ChoferController_1.default.getAll);
choferRouter.get('/dispo/:dispo', [], ChoferController_1.default.isValidDispo);
choferRouter.get('/msg/:disco', [], ChoferController_1.default.getPrevMessages);
choferRouter.get('/doc/:id', [], ChoferController_1.default.getDoc);
choferRouter.post('/', [
    (0, express_validator_1.body)('Nombre', 'Debe indicar el nombre del chofer').notEmpty(),
    (0, express_validator_1.body)('Telefono', 'Debe indicar el telefono del chofer').notEmpty(),
    (0, express_validator_1.body)('NumeroDiscos', 'Debe indicar el el numero de disco del chofer').notEmpty(),
    middleware_1.BodyValidator
], ChoferController_1.default.create);
choferRouter.delete('/:id', [], ChoferController_1.default.delete);
choferRouter.put('/:id', [], ChoferController_1.default.update);
choferRouter.put('/uploadDoc/:id', [], ChoferController_1.default.uploadDoc);
exports.default = choferRouter;
