import { Component } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapterService } from './services/socket-ioadapter.service';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from './services/user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geeksoverflowpimangular';
  userId = null;

  public adapter: ChatAdapter;

  constructor(private socket: Socket, private http: HttpClient, private userApi: UserApiService) {
    let user = this.userApi.getLoggedInUser();
    if (user != null)
    {
      this.userId = user.id_user;
    }
    this.adapter = new SocketIOAdapterService(this.userId, this.socket, this.http);
    console.log(this.adapter);
  }
}
