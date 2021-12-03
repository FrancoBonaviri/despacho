"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
var server_1 = __importDefault(require("../models/server"));
var SocketService = /** @class */ (function () {
    function SocketService() {
    }
    SocketService.startServer = function () {
        server_1.default.on('connection', function (client) {
            console.log(client);
        });
    };
    SocketService.emit = function (event, message) {
        server_1.default.emit(event, message);
    };
    return SocketService;
}());
exports.SocketService = SocketService;
