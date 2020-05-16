import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkmytournament',
  templateUrl: './checkmytournament.component.html',
  styleUrls: ['./checkmytournament.component.css']
})
export class CheckmytournamentComponent implements OnInit {

  data :any;
  accessCode2 ='';
  number3;number2;


  constructor(private route: ActivatedRoute, private router: Router,private tourService : TournamentService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.dataTournament;
      }
    });
  }

  ngOnInit() {

    this.number2= 0;

    this.tourService.numberofplacesroomtournament(this.data.tournamentname)
    .subscribe(response2 =>{
      this.number3= response2;

      this.number2=  parseInt(this.number3);

  });
  }



  back()
  {
    this.router.navigate(['mytournaments']);
  }



  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


}
