import express from 'express';
import { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from '../routes';
import cors from 'cors'
import fileUpload from 'express-fileupload';
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config()


class MyServer {


    //Aplication attribute ->
    app: Application;
    port: number;
    public socket: any;

    //Constructor whit the port application ->
    constructor(app: Application, port: any) {

        this.app = app;
        this.port = port;
        // Initialized express ->
        this.config();
        
        // this.setting()
        this.db_cnn();      

    }

    private config() {
        this.app.use( bodyParser.json() );
        
        if( true ){
            this.app.use( cors() );
            // cors cofig ->
            this.app.use( (req, res, next) => {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
                next();
            })
        }

        this.app.use('/', routes);
    }

    // set the port ->
    private setting(): void {
        this.app.set( 'port', this.port || process.env.PORT );
    }


    // Running the server ->
    listen() {
        this.app.listen( this.port, () => {
            console.log("Server running on port: " + this.port);
        });
    }

    db_cnn() {
        //Conectar a la Db
        mongoose.connect( process.env.MONGO_CONNECTION_STRING || '', 
        {},( err ) => {
            if( err ) throw err;
            console.log('Conected to MongoDb')
        } );

    }

}




let app = express();
app.use( fileUpload() );
const server = new MyServer(app, 4500);
const httpServer = createServer(server.app);
const io = new Server(httpServer, {  
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

httpServer.listen(4500);

export default io;