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
var Chofer_1 = require("../models/Chofer");
var viaje_1 = require("../models/viaje");
var choferController = /** @class */ (function () {
    function choferController() {
    }
    var _a;
    _a = choferController;
    choferController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var choferes, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Chofer_1.Chofer.find()];
                case 1:
                    choferes = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Choferes: choferes
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
    choferController.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, Nombre, Telefono, NumeroDiscos, DispoId, chofer, choferDb, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, Nombre = _b.Nombre, Telefono = _b.Telefono, NumeroDiscos = _b.NumeroDiscos, DispoId = _b.DispoId;
                    chofer = {
                        Nombre: Nombre,
                        Telefono: Telefono,
                        NumeroDiscos: NumeroDiscos,
                        DispoId: DispoId
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Chofer_1.Chofer.create(chofer)];
                case 2:
                    choferDb = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Chofer: choferDb
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
    choferController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    if (!id) {
                        throw new Error('Debe indicar el id del chofer');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Chofer_1.Chofer.findOneAndDelete({ id: id })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            message: "El Chofer fue eliminado correctamente"
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
    choferController.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, Nombre, Telfono, NumeroDiscos, chofer, choferDb, error_4;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, Nombre = _b.Nombre, Telfono = _b.Telfono, NumeroDiscos = _b.NumeroDiscos;
                    chofer = {
                        Nombre: Nombre,
                        Telfono: Telfono,
                        NumeroDiscos: NumeroDiscos
                    };
                    Object.keys(chofer).forEach(function (key) {
                        if (!chofer[key]) {
                            delete chofer[key];
                        }
                    });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Chofer_1.Chofer.findOneAndUpdate({ id: id }, chofer, { new: true })];
                case 2:
                    choferDb = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Chofer: choferDb
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
    choferController.isValidDispo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var dispoId, chofer, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    dispoId = req.params.dispo;
                    return [4 /*yield*/, Chofer_1.Chofer.findOne({ DispoId: dispoId })];
                case 1:
                    chofer = _b.sent();
                    if (chofer) {
                        return [2 /*return*/, res.json({
                                ok: true,
                                chofer: chofer
                            })];
                    }
                    return [2 /*return*/, res.json({
                            ok: false,
                            msg: 'dispositivo no encontrado'
                        })];
                case 2:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_5.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    choferController.getPrevMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var disco, messages_1, viajes, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    disco = req.params.disco;
                    messages_1 = [];
                    return [4 /*yield*/, viaje_1.Viaje.find({ $and: [{ Estado: { $in: ['2', '3', '4'] } }, { NumeroDisco: disco }] })];
                case 1:
                    viajes = _b.sent();
                    viajes.forEach(function (viaje) {
                        messages_1.push('Viaje a finalizar en: ' + viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle + ' \n Observaciones: ' + viaje.Comentario);
                    });
                    return [2 /*return*/, res.json({
                            ok: true,
                            messages: messages_1
                        })];
                case 2:
                    error_6 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_6.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return choferController;
}());
exports.default = choferController;
