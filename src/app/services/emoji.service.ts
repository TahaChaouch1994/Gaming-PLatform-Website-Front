import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Emoji } from '../models/emoji';


@Injectable({
  providedIn: 'root'
})
export class emojiService {

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


    uploadimageemoji(formData) {
      console.log(formData)
      return this.http.post<any>(this.base_path+"/image/emoji/", formData).pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    ajoutimage(item): Observable<string> {
      return this.http
        .post<string>(this.base_path+"/profil/emoji", JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
    getimagebyuser(id): Observable<Emoji[]>
  {
    return this.http
    .get<Emoji[]>(this.base_path+"/image/afficheemoji/"+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


}

