"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidCreateViaje = exports.BodyValidator = void 0;
var express_validator_1 = require("express-validator");
var BodyValidator = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: false,
            errors: errors.array()
        });
    }
    next();
};
exports.BodyValidator = BodyValidator;
var ValidCreateViaje = function (req, res, next) {
    var _a = req.body, PedidoPorWsp = _a.PedidoPorWsp, PedidoTelefono = _a.PedidoTelefono;
    // if( !PedidoPorWsp && !PedidoTelefono ) {
    //     return res.json({ 
    //         ok: false,
    //         error: 'Debe indicar si el viaje es por wsp o por telefono'
    //     });
    // }
    next();
};
exports.ValidCreateViaje = ValidCreateViaje;
