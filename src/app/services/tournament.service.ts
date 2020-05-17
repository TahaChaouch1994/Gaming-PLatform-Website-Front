import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament';
import { Jointournament } from '../models/jointournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  base_url="http://localhost:1337/tournament/";

  constructor(private http: HttpClient) { }



  getHello(hello) : Observable<string>
  {
    return this.http.get<string>(this.base_url+"test/" +hello);
  }


  getAllTournaments(): Observable<Tournament>
  {
    return this.http.get<Tournament>(this.base_url+"alltournaments");
  }

  getMyTournaments(iduser): Observable<Tournament[]>
  {
    return this.http.get<Tournament[]>(this.base_url+"mytournaments/"+iduser);
  }

  getMyTournamentsAccepted(iduser): Observable<Tournament[]>
  {
    return this.http.get<Tournament[]>(this.base_url+"mytournamentsaccepted/"+iduser);
  }


  transactionESDtournament(firstpublickey,firstprivatekey,secondpublickey,amount): Observable<Tournament[]>
  {
    return this.http.get<Tournament[]>(this.base_url+"transaction/"+firstpublickey+'/'+firstprivatekey+'/'+secondpublickey+'/'+amount);
  }


  gettournamentbyaccess(accessCode): Observable<Tournament[]>
  {
    return this.http.get<Tournament[]>(this.base_url+"gettournamentbycode/"+accessCode);
  }


  jointournament(iduser,tournamentname): Observable<Tournament[]>
  {
    return this.http.get<Tournament[]>(this.base_url+"jointournament/"+iduser+"/"+tournamentname);
  }


  numberofplacestournament(tournamentname): Observable<String>
  {
    return this.http.get<String>(this.base_url+"numberofplacestournament/"+tournamentname);
  }


  numberofplacesroomtournament(tournamentname): Observable<String>
  {
    return this.http.get<String>(this.base_url+"numberofplacesroomtournament/"+tournamentname);
  }


  checkjoined(tournamentname,userid): Observable<String>
  {
    return this.http.get<String>(this.base_url+"checkjoined/"+tournamentname+"/"+userid);
  }


  getMyTournamentsJoin(iduser): Observable<Jointournament[]>
  {
    return this.http.get<Jointournament[]>(this.base_url+"newtournament/"+iduser);
  }


}
