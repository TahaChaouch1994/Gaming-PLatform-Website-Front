
import { ForumCategories } from '../models/forum-categories';
import { Subreddits } from '../models/subreddits';
import { UserApiService } from './user-api.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ForumServicesService {

  
    
      base_path = 'http://localhost:1337';
    
      constructor(private http: HttpClient) { }
     
      // Http Options
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      
        listcategories(): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/forum/categories", this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
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

      createThread(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/thread/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
    }
    

  