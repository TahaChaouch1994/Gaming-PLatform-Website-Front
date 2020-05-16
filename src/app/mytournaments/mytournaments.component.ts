import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TournamentService } from '../services/tournament.service';
import { Router, NavigationExtras } from '@angular/router';
import { Tournament } from '../models/tournament';

@Component({
  selector: 'app-mytournaments',
  templateUrl: './mytournaments.component.html',
  styleUrls: ['./mytournaments.component.css']
})
export class MytournamentsComponent implements OnInit {

  constructor(private http: HttpClient,private tourService : TournamentService,private router: Router) { }

 public hell = [];
 public hell2 = [];
 public hell3 = [];
 public test =true;
 iduser = "5e4a89793d2c1f100cc86574";


  ngOnInit() {
    this.tourService.getMyTournaments(this.iduser)
    .subscribe(data => this.hell = data);

    this.tourService.getMyTournamentsAccepted(this.iduser)
    .subscribe(data => this.hell2 = data);




    this.tourService.getMyTournamentsJoin(this.iduser)
    .subscribe(data => this.hell3 = data);


  }


  justok()
  {
    console.log(this.hell);
  }




  checkMyTournament(dataTournament : Tournament)
  {
    let navigationExtras: NavigationExtras = {
      state: {
        dataTournament: dataTournament
      }
    };
    this.router.navigate(['checkmytournament'], navigationExtras);
  }
}
