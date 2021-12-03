import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private socketService: SocketService) { }



  getMessages(disco: string) {
    return this.socketService.listenEvent(disco);
  }
}
