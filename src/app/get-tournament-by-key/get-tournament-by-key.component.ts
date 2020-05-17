import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { Jointournament } from '../models/jointournament';

@Component({
  selector: 'app-get-tournament-by-key',
  templateUrl: './get-tournament-by-key.component.html',
  styleUrls: ['./get-tournament-by-key.component.css']
})
export class GetTournamentByKeyComponent implements OnInit {




  seconduserId= "5e4a89793d2c1f100cc86574";
 // seconduserId= "5e4fff742770c90b8cf21258";
  //seconduserId= "5e514f23e4d2fc262d4b08f7";
  //seconduserId= "7e514f23e4d2fc262d4b08f7";




  data:any;
  number ;
  number2 ;
  number3;
  jointest;
  firstpublickey=  '0xe07657d21E49E74b38CD0B0F7eD9d032C99fB7bf';
  firstprivatekey= '7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
  secondpublickey= '0xb1103661bA1736EC0C83931ce12851158b62875d';
  
  constructor(private route: ActivatedRoute, private router: Router,private tourService : TournamentService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.dataTournament;
      }
    });
  }


  ngOnInit() {

  this.jointest = false;

  



  this.tourService.checkjoined(this.data[0].tournamentname,this.seconduserId)
  .subscribe(response=>{
    if(response !='0')
    {
      this.jointest = true ;
 
    }
  })



    this.tourService.numberofplacesroomtournament(this.data[0].tournamentname)
    .subscribe(response2 =>{
      this.number3= response2;


        this.number2=  parseInt(this.number3);
      
  });

}
    
  

back(){
  this.router.navigate(['jointournament']);
}




  jointournamentan() {


    this.tourService.numberofplacestournament(this.data[0].tournamentname)
    .subscribe(response =>{
      this.number = response;
      this.tourService.numberofplacesroomtournament(this.data[0].tournamentname)
      .subscribe(response2 =>{
        this.number3= response2;
        this.number2= parseInt(this.number) + parseInt(this.number3);
        console.log(this.number2);
        if(parseInt(this.number2) < this.data[0].maxteams)
        {
          this.tourService.jointournament(this.seconduserId,this.data[0].tournamentname)
         .subscribe();
         this.jointest =true;
         this.tourService.transactionESDtournament(this.firstpublickey,this.firstprivatekey,this.secondpublickey,this.data[0].entryfee)
         .subscribe();
        }

        else 
        {

        }
      })
      
    });
  }

}
