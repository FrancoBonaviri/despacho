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
exports.Cliente = void 0;
var mongoose_1 = require("mongoose");
var clienteSchema = new mongoose_1.Schema({
    Nombre: {
        type: String,
        required: [false]
    },
    Codigo: {
        type: String,
        required: [true, 'Debe indicar el codigo del cliente']
    },
    NumeroTelefono: {
        type: String,
        required: [true]
    }
});
clienteSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    return data;
});
exports.Cliente = (0, mongoose_1.model)('Cliente', clienteSchema);
