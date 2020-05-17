import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatmessageService {

  private url = 'http://localhost:1337';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(user,msg,room) {
      this.socket.emit('new-message',{
        name:user,
        msg:msg,
        room:room
      });
      console.log({
        name:user,
        msg:msg,
        room:room
      });
    }

    
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}