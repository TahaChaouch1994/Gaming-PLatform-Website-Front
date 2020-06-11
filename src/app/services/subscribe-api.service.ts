import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Subscription } from '../models/subscription';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SubscribeApiService {

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

 /* sendFriendRequest(friendRequest): Observable<string>
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
*/
  getmysubscriptions(user): Observable<Subscription[]>
  {
    return this.http
      .get<Subscription[]>(this.base_path+"/abonnement/offert/"+user, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  checksubscription(iduser,idstreamer): Observable<Subscription[]>
  {
    return this.http
    .get<Subscription[]>(this.base_path+"/subscribe/user/"+iduser+"/"+idstreamer, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  subscribe(item): Observable<string> {
    return this.http
      .post<string>(this.base_path+"/profil/abonnement/", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  getUserbyId(id): Observable<User> {
    return this.http
    .get<User>(this.base_path+"/user/find?id="+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  

/*
  deleteFriend(user, friend): Observable<string>
  {
    return this.http
      .delete<string>(this.base_path+"/user/deleteFriend?user="+user+"&friend="+friend, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }*/
}
