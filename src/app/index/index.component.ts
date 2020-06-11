import { Component, OnInit } from '@angular/core';

import { BetserviceService } from '../services/betservice.service';
import { LeagueService } from '../services/leauge-service.service';
import { UserApiService } from '../services/user-api.service';
import { Singlegame } from '../models/singlegame';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
   betz = []
  constructor(
    public bser:BetserviceService ,
    public lolser: LeagueService,
    public user : UserApiService,
  ) { }
 
  ngOnInit() {
    let tm1 : any;
    let tm2 : any;
    this.betz = []
    this.lolser.getindexviewmatches().subscribe(t=>{
      
      t.forEach(game => {
        
       let sg = new Singlegame()
       sg.id = game.id
       let ls = [];
      ls = game.opponents
        tm1 = ls[0]
        tm2 = ls[1]
        sg.team1id = tm1.opponent.id
        sg.team2id = tm2.opponent.id
        sg.team1 = tm1.opponent.acronym
        sg.team2 = tm2.opponent.acronym
      
        sg.time = game.begin_at
        sg.cotet1 = 1.7
        sg.cotet2 = 1.7 
        sg.team1Checked = null
        sg.team2Checked = null 
        sg.t1flasg  = tm1.opponent.image_url 
        sg.t2flash  = tm2.opponent.image_url 
        
        this.betz.push(sg)
  })

  });
  }

}
