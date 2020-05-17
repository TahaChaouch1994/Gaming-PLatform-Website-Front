import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { observable, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  private url = 'http://localhost:1337';
  private socket;

  constructor() {
      this.socket = io(this.url);
  }

  sendMessageClient(user,msg,room)
  {console.log('firaasss'+{
    name:user,
    msg:msg,
    room:room
  })
this.socket.emit('client_new_msg',
{
  name:user,
  msg:msg,
  room:room
})
  }
  servernewMessage()
  {
    return new Observable((observer)=>
    {
this.socket.on('server_message',(data)=>
{
  observer.next(data)
})
    })
  }
  joinRoom(user,room)
  {
    console.log('inside the join service');
    this.socket.emit('new_join',{
      name:user,
      room:room
    })
  }
  serverJoinRoom()
  {
    return new Observable((observer)=>
    {
this.socket.on('server_new_join',(data)=>
{
  observer.next(data)
})
    })
  }
}
