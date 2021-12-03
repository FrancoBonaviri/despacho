"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Chofer_1 = __importDefault(require("./Chofer"));
var Cliente_1 = __importDefault(require("./Cliente"));
var Disco_1 = __importDefault(require("./Disco"));
var Viaje_1 = __importDefault(require("./Viaje"));
var routes = (0, express_1.Router)();
routes.use('/Disco', Disco_1.default);
routes.use('/Chofer', Chofer_1.default);
routes.use('/Viaje', Viaje_1.default);
routes.use('/cliente', Cliente_1.default);
exports.default = routes;
