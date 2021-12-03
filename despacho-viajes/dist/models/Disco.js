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
exports.Disco = void 0;
var mongoose_1 = require("mongoose");
var discoSchema = new mongoose_1.Schema({
    Titular: {
        type: String,
        required: [true, 'El titular es necesario']
    },
    Numero: {
        type: String,
        required: [true, 'El numero de disco es necesario']
    },
    TelefonoTitular: {
        type: String,
        required: [true, 'El Telefono del Titular de disco es necesario']
    },
    Marca: {
        type: String,
        required: [true, 'La Marca de disco es necesario']
    },
    Modelo: {
        type: String,
        required: [true, 'El Modelo de disco es necesario']
    },
    Patente: {
        type: String,
        required: [true, 'La Patente de disco es necesario']
    }
});
discoSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    return data;
});
exports.Disco = (0, mongoose_1.model)('Disco', discoSchema);
