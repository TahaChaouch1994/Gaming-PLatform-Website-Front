import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetserviceService {
  base_path = 'http://localhost:1337';
  gamedetails ="https://api.pandascore.co/matches/5684?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs" 
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
      
      sendcoupon(firstpublickey, secondpublickey, firstprivatekey, amount): Observable<any> {
        let item = {"firstpublickey":firstpublickey, "secondpublickey":secondpublickey, "firstprivatekey":firstprivatekey, "amount":amount};
        return this.http
          .post<any>(this.base_path+"/bet/transaction", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }


      addcoupon(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/coupons/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }


      getcouponsbyid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/coupons/find?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getcouponbyidc(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/coupon/find?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      betmatchdetails(matchid): Observable<any> {
        return this.http
        .get<string>(  "https://api.pandascore.co/matches/"+matchid+"?token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
          , this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      changestatus(id,status): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/coupon/update?id="+id+"&status="+status, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      createcouponreport(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/replycoupon/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
    }
