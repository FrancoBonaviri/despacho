import io from '../models/server'

export class SocketService {



    static startServer() {
        io.on('connection', (client : any) => {
            console.log(client);
            
        })
    }


    static emit(event: string, message: string) {
        io.emit(event, message);
    }

}