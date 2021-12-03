"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketService_1 = require("./services/SocketService");
//Starting function ->
var main = function () {
    SocketService_1.SocketService.startServer();
    // server.listen();
    // SocketService.startServer();
};
// play the game ->
main();
