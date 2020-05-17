import { ForumServicesService } from './../services/forum-services.service';
import { RouterModule } from '@angular/router';
import { LeagueService } from './../services/leauge-service.service';
import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-recruteplayers',
  templateUrl: './recruteplayers.component.html',
  styleUrls: ['./recruteplayers.component.css']
})
export class RecruteplayersComponent implements OnInit {
 players =[];

  constructor( 
    public lolser: LeagueService,
    public forser: ForumServicesService,
    ) { }

  ngOnInit() {
  this.forser.listsummoners().subscribe(e=>{
    console.log("players")
  
    e.forEach(element => {
      this.players.push(element)
    });
    console.log(this.players);
  }
  
  )
 
  }
  getplayerdetails(item){
    window.open(
      'https://'+item.server+'.op.gg/summoner/+userName='+item.summonername+'',
      '_blank' // <- This is what makes it open in a new window.
    );
  }
}
