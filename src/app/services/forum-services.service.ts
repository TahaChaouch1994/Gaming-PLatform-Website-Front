
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


      listcategories(): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/forum/categories", this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getThreadfromid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/thread/find?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      gettopicfrom(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/topic/find?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }


      getthreaddetailsfromid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/thread/getit?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      createThread(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/thread/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
      createreplyreport(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/replyreport/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

      Contactsupport(data :any): Observable<any> {
        return this.http.post(this.base_path + "/contact/mail",JSON.stringify(data),this.httpOptions).pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getallThreadsfromid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/thread/get?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      uploadthreadattachement(formData) {
        console.log(formData)
        return this.http.post<any>(this.base_path+"/thread/uploadattachement", formData).pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      createreply(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/reply/add", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
      getallpostsfromthreadid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/replys/get?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }



      getpostfromid(id): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/post/find?id="+id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }


      addliketothread(id,likez): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/thread/like?id="+id+"&likes="+likez, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      addliketopost(id,likez): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/post/like?id="+id+"&likes="+likez, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }





      addthreadreact(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/thread/react", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

      addpostraect(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/post/react", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
     
        removepostreact (item): Observable<any> {
        return this.http
        .post<string>(this.base_path+"/postreact/remove?id="+item, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
    
     /* removepostreact(item): Observable<any> {
        return this.http
          .post<any>(this.base_path+"/postreact/remove", JSON.stringify(item), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }*/
      threadlikecheck(userid,threadid): Observable<any> {
        return this.http
          .get<any>(this.base_path+"/thread/checker?id="+userid+"&thread="+threadid, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }

      postlikecheck(userid,threadid): Observable<any> {
        console.log("ahmed",threadid)
        return this.http
          .get<any>(this.base_path+"/post/checker?id="+userid+"&post="+threadid, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }




      listsummoners(): Observable<any> {
        return this.http
        .get<string>(this.base_path+"/summoners/get", this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
    }
    

   