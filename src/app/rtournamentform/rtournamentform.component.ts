import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {GameRegion} from './gameregion';
import { TournamentService } from '../services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rtournamentform',
  templateUrl: './rtournamentform.component.html',
  styleUrls: ['./rtournamentform.component.css']
})
export class RtournamentformComponent implements OnInit {


  selectedDay: string = '';
  selectedMap: string ='';
  selectedFormat: string='';




  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }

  selectChangeHandlerMap (event: any) {
    //update the ui
    this.selectedMap = event.target.value;
  }

  selectChangeHandlerFormat (event: any) {
    //update the ui
    this.selectedFormat = event.target.value;
  }

  hel  ='';
  
   message = this.http.get<any[]>('http://localhost:1337/tournament');
  

  constructor(private http: HttpClient,private tourService : TournamentService,private router: Router) { }

  ngOnInit() {


  }


  iduser="5e4a89793d2c1f100cc86574";
  gamename='League Of Legends';
  type='';
  tournamentname='';
  startdate='';
  starttime='';
  gameregion=this.selectedDay;
  gamemap = this.selectedMap;
  gameformat = this.selectedFormat ;
  entry ='';
  entryfee='';
  tournamentfee : any;
  minteams='';
  maxteams='';
  createtype='';
  reason ='nothing';
  codeAccess='0x';
  test = 0;
  lastPrice=0;
  

  firstpublickey=  '0xe07657d21E49E74b38CD0B0F7eD9d032C99fB7bf';
  firstprivatekey= '7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
  secondpublickey= '0xb1103661bA1736EC0C83931ce12851158b62875d';
  amount = 2;




  
  @HostListener('document:mouseover', ['$event'])
  mouseover(event) {
      if(event.target.matches('.submitButton')) {
        if(this.createtype=="spectator")
          this.lastPrice = parseInt(this.maxteams) * parseInt(this.entryfee)/2;
        else if(this.createtype=="participant")
          this.lastPrice = (parseInt(this.maxteams) * parseInt(this.entryfee)/2) + parseInt(this.entryfee);

          console.log("nooo");
      }
  }




  justClick() {
    this.tournamentfee = parseInt(this.maxteams) * parseInt(this.entryfee)/2;

    this.http.get<any>('http://localhost:1337/tournament/createtournament/'+this.iduser+'/'+this.gamename+'/'+this.type+'/'+this.tournamentname+'/'+this.startdate+'/'+this.starttime+'/'+this.selectedDay+'/'+this.selectedMap+'/'+this.selectedFormat+'/'+this.entry+'/'+this.entryfee+'/'+this.tournamentfee+'/'+this.lastPrice+'/'+this.minteams+'/'+this.maxteams+'/'+this.createtype+'/'+this.codeAccess+'/'+this.reason).subscribe();
  
   this.tourService.transactionESDtournament(this.firstpublickey,this.firstprivatekey,this.secondpublickey,this.tournamentfee+this.entryfee)
   .subscribe();


   if(this.createtype =="participant")
     {
      this.tourService.jointournament(this.iduser,this.tournamentname)
      .subscribe();
     }

   this.router.navigate(['mytournaments']);
   
  
  }




  justTest()
  {
    this.tourService.getHello("hahahah")
    .subscribe(data => this.hel = data);

  }

 







  





}
