import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {GameRegion} from './gameregion';

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

  
   message = this.http.get<any[]>('http://localhost:3005/tournament');
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  iduser=1;
  gamename='lol';
  type='';
  tournamentname='';
  startdate='';
  starttime='';
  gameregion=this.selectedDay;
  gamemap = this.selectedMap;
  gameformat = this.selectedFormat ;
  entry ='';
  entryfee='';
  minteams='';
  maxteams='';
  createtype='';
  



  justClick() {
   const nametest = 'hahah';

    this.http.get<any>('http://localhost:3005/tournament/createtournament/'+this.iduser+'/'+this.gamename+'/'+this.type+'/'+this.tournamentname+'/'+this.startdate+'/'+this.starttime+'/'+this.selectedDay+'/'+this.selectedMap+'/'+this.selectedFormat+'/'+this.entry+'/'+this.entryfee+'/'+this.minteams+'/'+this.maxteams+'/'+this.createtype).subscribe();
     
    console.log("GAME REGION ISSSSS" + this.selectedDay);
  
  }



  





}
