import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }


  listenEvent( event: string ): Observable<any> {
    return new Observable( obs => {
      this.socket.on(event, (data: any) => {
        obs.next(data);
      })
    })
  }

  
  emitEvent( event: string, data: any ) {
    this.socket.emit( event, data );
  }

}
