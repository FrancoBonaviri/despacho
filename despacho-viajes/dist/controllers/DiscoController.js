"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Disco_1 = require("../models/Disco");
var discoController = /** @class */ (function () {
    function discoController() {
    }
    var _a;
    _a = discoController;
    discoController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var discos, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Disco_1.Disco.find()];
                case 1:
                    discos = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Discos: discos
                        })];
                case 2:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_1.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    discoController.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, Titular, Numero, TelefonoTitular, Marca, Modelo, Patente, disco, discoDb, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, Titular = _b.Titular, Numero = _b.Numero, TelefonoTitular = _b.TelefonoTitular, Marca = _b.Marca, Modelo = _b.Modelo, Patente = _b.Patente;
                    disco = {
                        Titular: Titular,
                        Numero: Numero,
                        TelefonoTitular: TelefonoTitular,
                        Marca: Marca,
                        Modelo: Modelo,
                        Patente: Patente
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Disco_1.Disco.create(disco)];
                case 2:
                    discoDb = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Disco: discoDb
                        })];
                case 3:
                    error_2 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_2.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    discoController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Disco_1.Disco.findOneAndDelete({ id: id })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            message: "El disco fue eliminado correctamente"
                        })];
                case 3:
                    error_3 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_3.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    discoController.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, Titular, TelefonoTitular, Marca, Modelo, Patente, disco, discoDb, error_4;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, Titular = _b.Titular, TelefonoTitular = _b.TelefonoTitular, Marca = _b.Marca, Modelo = _b.Modelo, Patente = _b.Patente;
                    disco = {
                        Titular: Titular,
                        TelefonoTitular: TelefonoTitular,
                        Marca: Marca,
                        Modelo: Modelo,
                        Patente: Patente
                    };
                    Object.keys(disco).forEach(function (key) {
                        if (!disco[key]) {
                            delete disco[key];
                        }
                    });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Disco_1.Disco.findOneAndUpdate({ id: id }, disco, { new: true })];
                case 2:
                    discoDb = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Disco: discoDb
                        })];
                case 3:
                    error_4 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_4.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return discoController;
}());
exports.default = discoController;
