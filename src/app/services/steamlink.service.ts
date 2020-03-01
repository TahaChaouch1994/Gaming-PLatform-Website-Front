import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SteamlinkService {

  base_path = 'http://51.178.25.45:1337';

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

  getUserSteamId(user): Observable<string>
  {
    return this.http
    .get<string>(this.base_path+"/user/steamKey?user="+user, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteSteamAccount(user): Observable<string>
  {
    return this.http
    .delete<string>(this.base_path+"/user/unlinkSteam?user="+user, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPlayerGames(steamId): Observable<string>
  {
    return this.http
    .get<string>(this.base_path+"/user/getPlayerGames?steamId="+steamId, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
}
