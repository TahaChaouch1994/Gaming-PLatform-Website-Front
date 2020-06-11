import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatmessageService {

  private url = 'http://localhost:1337';
    private socket;
     imgChunks=[];
    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(user,msg,room,type) {
      this.socket.emit('new-message',{
        name:user,
        msg:msg,
        room:room,
        type:type
      });
      console.log({
        name:user,
        msg:msg,
        room:room,
        type:type
      });
    }
    public checkblock(user,room) {
      this.socket.emit('action',{
        msg:user,
        room:room,
        statut:"none"
      });
      console.log({
        msg:user,
        room:room,
        statut:"none"
      });
    }
    public getcheckblock = () => {
      return Observable.create((observer) => {
          this.socket.on('action', (message) => {
              observer.next(message);
              console.log(message);
          });
      });
  }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
    public getroom = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }
}