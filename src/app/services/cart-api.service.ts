import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { UserMerch } from '../models/user-merch';

@Injectable({
  providedIn: 'root'
})
export class CartApiService 
{
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

  getUserCart() : Cart
  {
    let str = localStorage.getItem("geeks_cart");
    if (str == null)
    {
      let cart = new Cart();
      localStorage.setItem("geeks_cart", JSON.stringify(cart));
      return cart;
    }
    else
    {
      return JSON.parse(str);
    }
  }

  addItemToCart(item, qte)
  {
    let cart = this.getUserCart();
    if (cart.orderList[item] != undefined)
    {
      let oldQte = Number(cart.orderList[item]);
      let convertQteToNum = Number(qte);
      cart.orderList[item] = oldQte + convertQteToNum;
    }
    else
    {
      cart.orderList[item] = qte;
    }
    localStorage.setItem("geeks_cart", JSON.stringify(cart));
  }

  removeItemFromCart(item)
  {
    let cart = this.getUserCart();
    delete cart.orderList[item];
    localStorage.setItem("geeks_cart", JSON.stringify(cart));
  }

  convertMerchIDsToObjects(): Observable<string>
  {
    let cart = {"list" : JSON.stringify(this.getUserCart().orderList)};
    return this.http
    .post<string>(this.base_path+"/cart/getMerchs", JSON.stringify(cart), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
