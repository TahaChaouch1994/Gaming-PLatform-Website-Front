import { Betcoupon } from './../models/betcoupon';
import { Matchresultdetails } from './../models/matchresultdetails';
import { BetserviceService } from './../services/betservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Couponreport } from '../models/couponreport';
import { UserApiService } from './../services/user-api.service';
@Component({
  selector: 'app-coupondetails',
  templateUrl: './coupondetails.component.html',
  styleUrls: ['./coupondetails.component.css']
})
export class CoupondetailsComponent implements OnInit {
betsz = []
zz = []
i  = 0 
w = 0 
betc : Betcoupon ;
  sbm = new Matchresultdetails()
bcop = []
coupstatus : string
paystatus : string
status : string
couponid : any
idth : any
  constructor(
    private route : Router,
    private aroute : ActivatedRoute,
    public betser : BetserviceService,
    private apiUser: UserApiService,
  ) { }

  ngOnInit() {

    this.couponid = this.aroute.params.subscribe((params => {this.idth = params['id']}));
   
   this.aze()

    
      
     
     


  }
  aze(){


 
    this.betser.getcouponbyidc(this.idth).subscribe(i=>{
      this.coupstatus = i.status
      this.paystatus =  i.payementstatus
      this.zz = i.coupongames
      
      let cpo = new Betcoupon()
      cpo = i ;
      this.betc = i ;
      cpo.couponid = i._id
      i.coupongames.forEach(element => {
      this.betsz.push(element)  
  
      });
      this.betsz.forEach(element=>{
       
        this.betser.betmatchdetails(element.id).subscribe(bd=>{
     
         
          let  sbm = new Matchresultdetails()
          sbm.Playedat = bd.begin_at
          sbm.matchid = bd.id
          console.log(bd )
          sbm.team1 = element.team1
          sbm.team2 = element.team2
          sbm.team2id = element.team2id
          sbm.team1id = element.team1id
          sbm.whowillwin = element.winningTeam
          if(bd.winner !== null)
          {
         

          if(bd.winner.id === element.team1id && element.winningTeam ===1 )
          {
            sbm.result = "correct"
            i++
            sbm.winner = 1
          }

          
          if(bd.winner.id === element.team2id && element.winningTeam === 2 )
          {
            sbm.result = "correct"
            i++
            sbm.winner = 2
          }
          if(bd.winner.id === element.team1id && element.winningTeam === 2 )
          {
            sbm.result = "wrong"
            this.w ++
            sbm.winner = 1
          }
          if(bd.winner.id === element.team2id && element.winningTeam ===1 )
          {
            this.w ++ 
            cpo.status = "wrong"
            sbm.winner = 2
          }


          }
          console.log(element)
          if(bd.winner=== null){
            sbm.result = "en cours"
            sbm.winner = 0
          }

          
       
          
  console.log(sbm)
          this.bcop.push(sbm)
  

          if(i === this.betsz.length)
          {
            cpo.status = "won"
          }
          if(i < this.betsz.length && this.w === 0)
          {
            cpo.status = "en cours"
          }
          if(this.w > 0)
          {
            cpo.status = "lost"
          }
    
          console.log("loooooooooooooooooooooool")
          console.log(cpo.couponid)
          console.log(cpo.status)
          this.betser.changestatus(cpo.couponid,cpo.status).subscribe()
        }
        
        )
     
      })
      }
    )
   } 


   addcouponreport(title,reportde){
    let rep : Couponreport
    rep= new Couponreport()
 rep.description =reportde;
 rep.coupon = this.betc;
 rep.sender = this.apiUser.getLoggedInUser()
 rep.title = title;
 rep.addtime =  new Date();
 this.betser.createcouponreport(rep).subscribe();

  }

}
