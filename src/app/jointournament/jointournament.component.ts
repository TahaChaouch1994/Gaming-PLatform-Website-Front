import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jointournament',
  templateUrl: './jointournament.component.html',
  styleUrls: ['./jointournament.component.css']

})
export class JointournamentComponent implements OnInit {

  constructor(private http: HttpClient,private tourService : TournamentService,private router: Router) { }




  fieldprivate;
  accessCode='';
  hell = [];
  tester;

  ngOnInit() {
    this.fieldprivate = false;
    this.tester = false;
  }



  getTournament()
  {
    if(this.fieldprivate == false)
      {
        this.fieldprivate =true;
      }

      else 
      {
        
      this.tourService.gettournamentbyaccess(this.accessCode)
     .subscribe(response => {
        if(response.length == 0)
        {
            this.tester = true;
        }

        else
        {
          this.tester = false;
          
          let navigationExtras: NavigationExtras = {
            state: {
              dataTournament: response
            }
          };
          this.router.navigate(['gettourbykey'], navigationExtras);

        }
     });


   //  console.log(this.hell.length);
  //  console.log(this.accessCode);

      }
  }
}
