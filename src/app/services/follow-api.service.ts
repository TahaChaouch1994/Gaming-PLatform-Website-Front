import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowApiService 

{

    base_path = 'http://127.0.0.1:1337';
  
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
  
    followingApi(item): Observable<string> {
      return this.http
        .post<string>(this.base_path+"/profil/follow", JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

/*
    searchForUsers(username): Observable<string> {
      return this.http
      .get<string>(this.base_path+"/user/searchByUsername?username="+username, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }*/
  }