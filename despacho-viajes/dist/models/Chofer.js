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
exports.Chofer = void 0;
var mongoose_1 = require("mongoose");
var choferSchema = new mongoose_1.Schema({
    NumeroDiscos: [{ type: String }],
    Telefono: {
        type: String,
        required: [true, "El numero de telefono es requerido"]
    },
    Nombre: {
        type: String
    },
    DispoId: {
        type: String,
        required: [true, 'Debe indicar el ID del telefono del chofer']
    }
});
choferSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    return data;
});
exports.Chofer = (0, mongoose_1.model)('Chofer', choferSchema);
