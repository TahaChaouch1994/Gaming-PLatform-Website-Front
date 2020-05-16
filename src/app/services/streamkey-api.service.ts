import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamkeyApiService {

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

  getUserStreamKey(id): Observable<string> {
    return this.http
    .get<string>(this.base_path+"/user/streamKey?user="+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUserStreamKey(id): Observable<string>
  {
    return this.http
      .post<string>(this.base_path+"/user/resetStreamKey", {"user":id}, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAllStreams(key): Observable<string>
  {
    return this.http
    .get<string>("http://localhost:1338/api/streams", this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
}
