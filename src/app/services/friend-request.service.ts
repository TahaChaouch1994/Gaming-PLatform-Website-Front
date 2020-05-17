import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FriendRequestService {

  base_path = 'http://localhost:1337';

  constructor(private http: HttpClient) { }
 
  // Http Options
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

  sendFriendRequest(friendRequest): Observable<string>
  {
    return this.http
      .post<string>(this.base_path+"/user/sendFriendRequest", JSON.stringify(friendRequest), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  revokeFriendRequest(friendRequest): Observable<string>
  {
    return this.http
      .delete<string>(this.base_path+"/user/revokeFriendRequest?id="+friendRequest, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  acceptFriendRequest(friendRequest): Observable<string>
  {
    return this.http
      .post<string>(this.base_path+"/user/acceptFriendRequest", JSON.stringify(friendRequest), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  hasRequestForReceiver(sender, receiver): Observable<string>
  {
    return this.http
      .get<string>(this.base_path+"/user/hasRequestForReceiver?sender="+sender+"&receiver="+receiver, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserFriendRequests(receiver): Observable<string>
  {
    return this.http
      .get<string>(this.base_path+"/user/friendRequests?receiver="+receiver, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserFriends(user): Observable<string>
  {
    return this.http
      .get<string>(this.base_path+"/user/getUserFriends?user="+user, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteFriend(user, friend): Observable<string>
  {
    return this.http
      .delete<string>(this.base_path+"/user/deleteFriend?user="+user+"&friend="+friend, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
}
