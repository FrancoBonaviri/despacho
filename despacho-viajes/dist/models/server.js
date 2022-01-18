"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("../routes"));
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var createServer = require("http").createServer;
var Server = require("socket.io").Server;
require('dotenv').config();
var MyServer = /** @class */ (function () {
    //Constructor whit the port application ->
    function MyServer(app, port) {
        this.app = app;
        this.port = port;
        // Initialized express ->
        this.config();
        // this.setting()
        this.db_cnn();
    }
    MyServer.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        if (true) {
            this.app.use((0, cors_1.default)());
            // cors cofig ->
            this.app.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }
        this.app.use('/', routes_1.default);
    };
    // set the port ->
    MyServer.prototype.setting = function () {
        this.app.set('port', this.port || process.env.PORT);
    };
    // Running the server ->
    MyServer.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server running on port: " + _this.port);
        });
    };
    MyServer.prototype.db_cnn = function () {
        //Conectar a la Db
        mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING || '', {}, function (err) {
            if (err)
                throw err;
            console.log('Conected to MongoDb');
        });
    };
    return MyServer;
}());
var app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
var server = new MyServer(app, 4500);
var httpServer = createServer(server.app);
var io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
httpServer.listen(4500);
exports.default = io;
