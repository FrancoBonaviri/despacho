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
var Cliente_1 = require("../models/Cliente");
var Disco_1 = require("../models/Disco");
var viaje_1 = require("../models/viaje");
var SocketService_1 = require("../services/SocketService");
var viajeController = /** @class */ (function () {
    function viajeController() {
    }
    var _a;
    _a = viajeController;
    viajeController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var estado, viajes, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    estado = req.params.state;
                    if (!estado) {
                        estado = '0';
                    }
                    return [4 /*yield*/, viaje_1.Viaje.find({ Estado: estado, FechaPedido: { $gt: new Date('2000-01-01'), $lt: new Date() } })];
                case 1:
                    viajes = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viajes: viajes
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
    viajeController.getbyId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, viaje, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, viaje_1.Viaje.findById(id)];
                case 1:
                    viaje = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            viaje: viaje
                        })];
                case 2:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_2.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    viajeController.createReserva = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, MinutosAntesReserva, FechaReserva, viaje, viajeDb, _c, error_3;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = req.body, Calle = _b.Calle, Numero = _b.Numero, EntreCalle = _b.EntreCalle, Localidad = _b.Localidad, CodigoCliente = _b.CodigoCliente, PedidoPorWsp = _b.PedidoPorWsp, PedidoTelefono = _b.PedidoTelefono, Comentario = _b.Comentario, Telefono = _b.Telefono, Condicion = _b.Condicion, MinutosAntesReserva = _b.MinutosAntesReserva, FechaReserva = _b.FechaReserva;
                    viaje = {
                        Calle: Calle,
                        Numero: Numero,
                        EntreCalle: EntreCalle,
                        Localidad: Localidad,
                        FechaPedido: new Date(FechaReserva).setMinutes(new Date(FechaReserva).getMinutes() - Number(MinutosAntesReserva)),
                        Estado: viaje_1.estadoViaje.Pendiente,
                        CodigoCliente: CodigoCliente,
                        PedidoTelefono: !!PedidoTelefono,
                        PedidoPorWsp: !!PedidoPorWsp,
                        Comentario: Comentario,
                        Condicion: Condicion,
                        Reserva: true,
                        MinutosAntesReserva: MinutosAntesReserva,
                        FechaReserva: FechaReserva
                    };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, viaje_1.Viaje.create(viaje)];
                case 2:
                    viajeDb = _d.sent();
                    _c = (CodigoCliente === null || CodigoCliente === void 0 ? void 0 : CodigoCliente.trim()) != '' && (Telefono === null || Telefono === void 0 ? void 0 : Telefono.trim()) != '';
                    if (!_c) return [3 /*break*/, 4];
                    return [4 /*yield*/, Cliente_1.Cliente.exists({ Codigo: CodigoCliente })];
                case 3:
                    _c = !(_d.sent());
                    _d.label = 4;
                case 4:
                    if (!_c) return [3 /*break*/, 6];
                    return [4 /*yield*/, Cliente_1.Cliente.create({ NumeroTelefono: Telefono, Codigo: CodigoCliente })];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [2 /*return*/, res.json({
                        ok: true,
                        Viaje: viajeDb
                    })];
                case 7:
                    error_3 = _d.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_3.message
                        })];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    viajeController.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, viaje, viajeDb, _c, error_4;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = req.body, Calle = _b.Calle, Numero = _b.Numero, EntreCalle = _b.EntreCalle, Localidad = _b.Localidad, CodigoCliente = _b.CodigoCliente, PedidoPorWsp = _b.PedidoPorWsp, PedidoTelefono = _b.PedidoTelefono, Comentario = _b.Comentario, Telefono = _b.Telefono, Condicion = _b.Condicion;
                    viaje = {
                        Calle: Calle,
                        Numero: Numero,
                        EntreCalle: EntreCalle,
                        Localidad: Localidad,
                        FechaPedido: new Date(),
                        Estado: viaje_1.estadoViaje.Pendiente,
                        CodigoCliente: CodigoCliente,
                        PedidoTelefono: !!PedidoTelefono,
                        PedidoPorWsp: !!PedidoPorWsp,
                        Comentario: Comentario,
                        Condicion: Condicion
                    };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, viaje_1.Viaje.create(viaje)];
                case 2:
                    viajeDb = _d.sent();
                    _c = (CodigoCliente === null || CodigoCliente === void 0 ? void 0 : CodigoCliente.trim()) != '' && (Telefono === null || Telefono === void 0 ? void 0 : Telefono.trim()) != '';
                    if (!_c) return [3 /*break*/, 4];
                    return [4 /*yield*/, Cliente_1.Cliente.exists({ Codigo: CodigoCliente })];
                case 3:
                    _c = !(_d.sent());
                    _d.label = 4;
                case 4:
                    if (!_c) return [3 /*break*/, 6];
                    return [4 /*yield*/, Cliente_1.Cliente.create({ NumeroTelefono: Telefono, Codigo: CodigoCliente })];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [2 /*return*/, res.json({
                        ok: true,
                        Viaje: viajeDb
                    })];
                case 7:
                    error_4 = _d.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_4.message
                        })];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    // confirma el viaje (le asigna el disco que va a ir )
    viajeController.confirm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var disco, id, body, viajeDb, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    disco = req.query.disco;
                    id = req.query.id;
                    if (!id || !disco) {
                        throw new Error('Debe indicar el id y el disco del viaje');
                    }
                    body = {
                        NumeroDisco: disco,
                        Estado: viaje_1.estadoViaje.EnCurso,
                        FechaConfirmacion: new Date()
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, Disco_1.Disco.exists({ Numero: disco })];
                case 2:
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: "El Numero de disco no existe"
                            })];
                    }
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndUpdate(id, body, { new: true })];
                case 3:
                    viajeDb = _b.sent();
                    if (!viajeDb) {
                        throw new Error("No se encontro el viaje.");
                    }
                    SocketService_1.SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario);
                    console.log("TODO AVISAR AL CLIENTE POR WSP");
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viaje: viajeDb
                        })];
                case 4:
                    error_5 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_5.message
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // completa el viaje (le dice al chofer la direccion final)
    //DEPRECATED
    viajeController.completar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, body, viajeDb, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    body = {
                        Estado: viaje_1.estadoViaje.EnCurso,
                    };
                    if (!id) {
                        throw new Error('Debe indicar el id del viaje');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndUpdate(id, body, { new: true })];
                case 2:
                    viajeDb = _b.sent();
                    if (!viajeDb) {
                        throw new Error("No se encontro el viaje.");
                    }
                    SocketService_1.SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario);
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viaje: viajeDb
                        })];
                case 3:
                    error_6 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_6.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // finaliza el viaje
    viajeController.finalizar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, body, viajeDb, error_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.query.id;
                    body = {
                        Estado: viaje_1.estadoViaje.Finalizado,
                    };
                    if (!id) {
                        throw new Error('Debe indicar el id del viaje');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndUpdate(id, body, { new: true })];
                case 2:
                    viajeDb = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viaje: viajeDb
                        })];
                case 3:
                    error_7 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_7.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    viajeController.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, _b, Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, body, viajeDb, error_8;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, Calle = _b.Calle, Numero = _b.Numero, EntreCalle = _b.EntreCalle, Localidad = _b.Localidad, CodigoCliente = _b.CodigoCliente, PedidoPorWsp = _b.PedidoPorWsp, PedidoTelefono = _b.PedidoTelefono, Comentario = _b.Comentario, Telefono = _b.Telefono, Condicion = _b.Condicion;
                    body = {
                        Calle: Calle,
                        Numero: Numero,
                        EntreCalle: EntreCalle,
                        Localidad: Localidad,
                        CodigoCliente: CodigoCliente,
                        PedidoPorWsp: PedidoPorWsp,
                        PedidoTelefono: PedidoTelefono,
                        Comentario: Comentario,
                        Telefono: Telefono,
                        Condicion: Condicion
                    };
                    if (!id) {
                        throw new Error('Debe indicar el id del viaje');
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndUpdate(id, body, { new: true })];
                case 2:
                    viajeDb = _c.sent();
                    if ((viajeDb === null || viajeDb === void 0 ? void 0 : viajeDb.Estado) == '2') {
                        SocketService_1.SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje ACTUALIZADO en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario);
                    }
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viaje: viajeDb
                        })];
                case 3:
                    error_8 = _c.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_8.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    viajeController.cambiarDisco = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, Disco, body, viaje, viajeDb, error_9;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    Disco = req.body.Disco;
                    body = {
                        NumeroDisco: Disco
                    };
                    if (!id) {
                        throw new Error('Debe indicar el id del viaje');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, viaje_1.Viaje.findById(id)];
                case 2:
                    viaje = _b.sent();
                    if (!viaje || viaje.Estado != '2') {
                        throw new Error('No se le puede cambiar el disco a dicho viaje');
                    }
                    // Le aviso al chofer anterior que se le cancelo el viaje => 
                    SocketService_1.SocketService.emit(viaje.NumeroDisco, 'Viaje en: ' + viaje.Calle + ' ' + viaje.Numero + ' CANCELADO');
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndUpdate(id, body, { new: true })];
                case 3:
                    viajeDb = _b.sent();
                    if (!viajeDb) {
                        throw new Error("No se encontro el viaje.");
                    }
                    // Le aviso del viaje al nuevo chofer
                    SocketService_1.SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario);
                    return [2 /*return*/, res.json({
                            ok: true,
                            Viaje: viajeDb
                        })];
                case 4:
                    error_9 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_9.message
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    viajeController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_10;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, viaje_1.Viaje.findByIdAndDelete(id)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.json({
                            ok: true,
                            message: "El viaje fue eliminado correctamente"
                        })];
                case 3:
                    error_10 = _b.sent();
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: error_10.message
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return viajeController;
}());
exports.default = viajeController;
