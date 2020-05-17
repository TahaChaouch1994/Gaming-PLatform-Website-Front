import { Injectable } from '@angular/core';
import { ChatAdapter, ParticipantResponse, Message } from 'ng-chat';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIOAdapterService extends ChatAdapter {
    
    base_path = 'http://localhost:1337';

    private socket: Socket;
    private http: HttpClient;
    private userId: string;

    constructor(userId: string, socket: Socket, http: HttpClient) {
        super();
        this.socket = socket;
        this.http = http;
        this.userId = userId;

        this.InitializeSocketListerners();  
    }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    };

    listFriends(): Observable<ParticipantResponse[]> {
      return this.http
      .post<ParticipantResponse[]>(this.base_path+"/user/listFriends", { "user":this.userId }, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    
    getMessageHistory(destinataryId: any): Observable<Message[]> {
      throw new Error("Method not implemented.");
    }
    
    sendMessage(message: Message): void {
      this.socket.emit("sendMessage", message);
    }

    public InitializeSocketListerners(): void
    {
      this.socket.on("messageReceived", (messageWrapper) => {
        console.log(messageWrapper["message"]);
        if (messageWrapper["message"]["toId"] === this.userId)
        {
          this.onMessageReceived(messageWrapper.user, messageWrapper.message);
        }
      });

      this.socket.on("friendsListChanged", (usersCollection: Array<ParticipantResponse>) => {
        this.onFriendsListChanged(usersCollection.filter(x => x.participant.id != this.userId));
      });
    }
}

