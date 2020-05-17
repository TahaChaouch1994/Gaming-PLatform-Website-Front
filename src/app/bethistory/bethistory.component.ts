import { Betcoupon } from './../models/betcoupon';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../services/leauge-service.service';
import { BetserviceService } from '../services/betservice.service';
import { UserApiService } from '../services/user-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bethistory',
  templateUrl: './bethistory.component.html',
  styleUrls: ['./bethistory.component.css']
})
export class BethistoryComponent implements OnInit {
  bets = []
  ze = []
  betts = []
  cuser : string
 
  constructor(
    private route : Router,
    private aroute : ActivatedRoute,
    public bser:BetserviceService ,
    public lolser: LeagueService,
    public user : UserApiService,
  ) { }

  ngOnInit() {
   this.cuser = this.user.getLoggedInUser().id_user ;
   this.bser.getcouponsbyid(this.cuser).subscribe(i=>{
    let vou  =new Betcoupon()
      vou = i 
     
     this.bets = i

   
    })
    
    
  
    console.log(this.bets)


  }


  showcoupondetails(id){
    console.log(id)
    this.route.navigate([ "/coupondetails" ,{id : id}]);


  }
}
