import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserApiService 
{

  base_path = 'http://localhost:1337';

  constructor(private http: HttpClient) { }
 
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getLoggedInUser(): User
  {
    let str = sessionStorage.getItem("geov_user");
    if (str != null)
    {
      console.log("user found");
      return JSON.parse(str);
    }
    else
    {
      let str2 = localStorage.getItem("geov_user");
      if (str2 != null)
      {
        return JSON.parse(str2);
      }
      else
      {
        return null;
      }
    }
  }

  getSessionInfo(): string
  {
    let str = sessionStorage.getItem("geov_user");
    if (str != null)
    {
      return "session";
    }
    else
    {
      let str2 = localStorage.getItem("geov_user");
      if (str2 != null)
      {
        return "local";
      }
      else
      {
        return null;
      }
    }
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

  createUser(item): Observable<string> {
    return this.http
      .post<string>(this.base_path+"/user/register", JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  loginUser(login, password): Observable<string> {
    return this.http
    .get<string>(this.base_path+"/user/login?login="+login+"&password="+password, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(user): Observable<string> {
    return this.http
    .put<string>(this.base_path+"/user/update", JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
<<<<<<< HEAD
=======

  updateUserActvity(user: User): Observable<string> {
    return this.http
    .put<string>(this.base_path+"/user/updateActivity", JSON.stringify({"id_user": user.id_user, "status": user.activity, "lastActive": user.lastActive}), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  verifyUser(id, key): Observable<string> {
    return this.http
    .get<string>(this.base_path+"/user/verify?id="+id+"&key="+key, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserFromId(id): Observable<string> {
    return this.http
    .get<string>(this.base_path+"/user/find?id="+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  uploadUserAvatar(formData) {
    return this.http.post<any>(this.base_path+"/user/uploadAvatar", formData).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  searchForUsers(username): Observable<string> {
    return this.http
    .get<string>(this.base_path+"/user/searchByUsername?username="+username, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
>>>>>>> 92b434ef3e20a4e68a2dd75654e3d8cfd98691f7
}
