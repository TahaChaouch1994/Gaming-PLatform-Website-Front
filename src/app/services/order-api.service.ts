import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

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

  checkoutCart(order: Order): Observable<string>
  {
    return this.http
    .post<string>(this.base_path+"/cart/buyMerch", JSON.stringify(order), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  getUserOrderHistory(userId): Observable<string>
  {
    return this.http
    .get<string>(this.base_path+"/orders/history?user="+userId, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
}
