"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viaje = exports.estadoViaje = void 0;
var mongoose_1 = require("mongoose");
var viajeSchema = new mongoose_1.Schema({
    Calle: {
        type: String,
        required: [true, 'La calle necesaria']
    },
    Numero: {
        type: String,
        required: [true, 'El numero de calle es necesario']
    },
    EntreCalle: {
        type: String,
        required: [true, 'Las Entre Calles son necesarias']
    },
    Localidad: {
        type: String,
        required: [true, "La localidad es necesaria"]
    },
    NumeroDisco: {
        type: String,
    },
    Estado: {
        type: String,
        required: [true, 'El estado es necesario']
    },
    FechaPedido: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    FechaConfirmacion: {
        type: Date
    },
    PedidoPorWsp: {
        type: Boolean,
        default: false
    },
    PedidoTelefono: {
        type: Boolean,
        default: false
    },
    CodigoCliente: {
        type: String
    },
    Comentario: {
        type: String
    },
    Condicion: [{ type: String }],
    Reserva: {
        type: Boolean,
        default: false
    },
    MinutosAntesReserva: {
        type: String
    },
    FechaReserva: {
        type: Date,
    }
});
var estadoViaje;
(function (estadoViaje) {
    estadoViaje[estadoViaje["Pendiente"] = 0] = "Pendiente";
    estadoViaje[estadoViaje["ACompletar"] = 1] = "ACompletar";
    estadoViaje[estadoViaje["EnCurso"] = 2] = "EnCurso";
    estadoViaje[estadoViaje["Finalizado"] = 3] = "Finalizado";
})(estadoViaje = exports.estadoViaje || (exports.estadoViaje = {}));
;
viajeSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    return data;
});
exports.Viaje = (0, mongoose_1.model)('Viaje', viajeSchema);
