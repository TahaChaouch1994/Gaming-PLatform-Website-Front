import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  base_path = 'https://api.pandascore.co/';
  token = '?token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs';


  firstviewpath ="https://api.pandascore.co/lol/matches/upcoming?per_page=25&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"  
  firstviewpathindex ="https://api.pandascore.co/lol/matches/upcoming?per_page=5&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
  runnningtournamentslol = "https://api.pandascore.co/lol/tournaments/running?per_page=100&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
  runningtournamentscsgo ="https://api.pandascore.co/csgo/tournaments/running?per_page=100&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
 
  runningtournamentsow ="https://api.pandascore.co /ow/tournaments/running?per_page=100&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"

  //https://api.pandascore.co/lol/matches/upcoming?filter[=serie_id]=2384&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs
  playersleague = "https://api.pandascore.co/lol/players?token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
  

  firstviewdotapath ="https://api.pandascore.co/dota2/matches/upcoming?per_page=25&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"   
  firstviewowpath ="https://api.pandascore.co/ow/matches/upcoming?per_page=25&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
  firstviewcsgopath ="https://api.pandascore.co/csgo/matches/upcoming?per_page=25&?&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"

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




      getallloltournaments(): Observable<any> {
        return this.http
        .get<string>(this.runnningtournamentslol, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      getalllolgamesbyserie(serieid): Observable<any> {
        return this.http
        .get<string>(  "https://api.pandascore.co/lol/matches/upcoming?filter[serie_id]="+serieid+"&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
          , this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

     
      getallcsgamesbyserie(serieid): Observable<any> {
        return this.http
        .get<string>(  "https://api.pandascore.co/csgo/matches/upcoming?filter[serie_id]="+serieid+"&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
          , this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      getallcstournaments(): Observable<any> {
        return this.http
        .get<string>(this.runningtournamentscsgo, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }


      getallowgamesbyserie(serieid): Observable<any> {
        return this.http
        .get<string>(  "https://api.pandascore.co/ow/matches/upcoming?filter[serie_id]="+serieid+"&token=ZV-nLY0nNffW68sckRgH761scRf0vc5GfMsjYWYtpfsChM0TnDs"
          , this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      getallowtournaments(): Observable<any> {
        return this.http
        .get<string>(this.runningtournamentsow, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }


      getfirstviewmatches(): Observable<any> {
        return this.http
        .get<string>(this.firstviewpath, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
      getfirstviewdotamatches(): Observable<any> {
        return this.http
        .get<string>(this.firstviewdotapath, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getfirstviewowmatches(): Observable<any> {
        return this.http
        .get<string>(this.firstviewowpath, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getfirstviewcsgomatches(): Observable<any> {
        return this.http
        .get<string>(this.firstviewcsgopath, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }

      getallleagueplayers(): Observable<any> {
        return this.http
        .get<string>(this.playersleague, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }


      getindexviewmatches(): Observable<any> {
        return this.http
        .get<string>(this.firstviewpathindex, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
}
