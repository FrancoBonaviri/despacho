    // Import the server ->
import io from './models/server'
import { SocketService } from './services/SocketService';



//Starting function ->
const main = () => {

    SocketService.startServer()

    // server.listen();
    // SocketService.startServer();
}

// play the game ->
main();