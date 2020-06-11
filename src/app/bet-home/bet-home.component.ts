import { SnackbarComponent } from './../snackbar/snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { UserApiService } from './../services/user-api.service';
import { Betcoupon } from './../models/betcoupon';
import { Bettournaments } from './../models/bettournaments';
import { Singlegame } from './../models/singlegame';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BetserviceService } from '../services/betservice.service';
import { LeagueService } from '../services/leauge-service.service';
import { element } from 'protractor';
import * as moment from 'moment'
import {MatSnackBar}  from '@angular/material/snack-bar';
import { KeybetmodalComponent } from '../keybetmodal/keybetmodal.component';
@Component({
  selector: 'app-bet-home',
  templateUrl: './bet-home.component.html',
  styleUrls: ['./bet-home.component.css']
})
export class BetHomeComponent implements OnInit {

  detectlol : any;
  dateselectedlol  = new Date()
  detectcs : any;
  dateselectedcs  = new Date()
  detectdow : any;
  dateselectow  = new Date()
  dialogRef  : any ; 




  total = 1
ammount = 0
show = []
loltours = []
cstours = []
dotatours = []
date : any;
startdate : any
matches = new Map();
input : any
bet = []
bbet = []
csbetp = []
wowbetp=[]
betdota = []
betwow = []
betcsgo = []
coupon = []

  constructor(
    private matDialog : MatDialog,
    private snackBar : MatSnackBar,
    public bser:BetserviceService ,
    public lolser: LeagueService,
    public user : UserApiService,

  ) { }
 
  ngOnInit() {
    this.total = 1
this.ammount = 0
    this.show = []
   /* this.loltours = []
    this.cstours = []
    this.dotatours = []

    this.matches = new Map();

  
    this.bbet = []
    this.csbetp = []
    this.wowbetp=[]
    this.betdota = []
    this.betwow = []
    this.betcsgo = []*/
    this.coupon = []
  let tm1 : any;
    let tm2 : any;
    this.bet = []
    this.startdate = new Date()
    this.date = moment(new Date());

    this.lolser.getallloltournaments().subscribe(lt=>{
      
        lt.forEach(tour => {
     
         let lolt = new Bettournaments()
         lolt.tourneyid = tour.serie_id
         lolt.tourneyname = tour.slug
          this.loltours.push(lolt)
         
    })
    console.log (this.loltours)
    });
    


    this.lolser.getallcstournaments().subscribe(lt=>{
      
      lt.forEach(tour => {
   
       let cst = new Bettournaments()
       cst.tourneyid = tour.serie_id
       cst.tourneyname = tour.slug
        this.cstours.push(cst)
       
  })
  console.log (this.cstours)
  });


    this.lolser.getallcstournaments().subscribe(lt=>{
      
      lt.forEach(tour => {
   
       let cst = new Bettournaments()
       cst.tourneyid = tour.serie_id
       cst.tourneyname = tour.slug
        this.cstours.push(cst)
     
  })
  console.log (this.cstours)
  });

    this.lolser.getfirstviewmatches().subscribe(t=>{
      
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
        
        this.bet.push(sg)
  })

  });
this.bbet = this.bet


 


  this.lolser.getfirstviewcsgomatches().subscribe(t=>{
  t.forEach(gamez => {
    
   let ZE = new Singlegame()
   ZE.id = gamez.id
   let ls = [];
 
  ls = gamez.opponents
    tm1 = ls[0]
    tm2 = ls[1]
    ZE.team1 = tm1.opponent.name
    ZE.team2 = tm2.opponent.name
    console.log('hhhhhhhhhhhhhhhhhhhhh')
    console.log (tm1)
    ZE.time = gamez.begin_at
    ZE.cotet1 = 1.7
    ZE.cotet2 = 1.7 
    ZE.team1id = tm1.opponent.id
    ZE.team2id = tm2.opponent.id
    ZE.team1Checked = null
    ZE.team2Checked = null 
    ZE.t1flasg  = tm1.opponent.image_url 
    ZE.t2flash  = tm2.opponent.image_url 
  
    this.betcsgo.push(ZE)
})
  }); 
this.csbetp = this.betcsgo
this.wowbetp = this.betwow

}
  
addBet(item , value,name){
  this.bet.forEach(element => {
    if(element.id == item.id){
      if(name === "cote1"){
        if(!element.team1Checked){
        let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet1, winningTeam:1 ,team1id : element.team1id ,team2id : element.team2id }
        this.coupon.push(item);
        element.team1Checked = true
        element.team2Checked = false
        this.total = this.total * element.cotet1
        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet1

        }
        console.log("ee")
      }else{
        if(!element.team2Checked){
          let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet2 , winningTeam:2 ,team1id : element.team1id ,team2id : element.team2id }
          this.coupon.push(item);
        element.team1Checked = false
        element.team2Checked = true
        this.total = this.total * element.cotet2

        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet2

        }
        console.log("ee")

      }
    }
 });
}


addBetcs(item , value,name){
  this.betcsgo.forEach(element => {
    if(element.id == item.id){
      if(name === "cote1"){
        if(!element.team1Checked){
        let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet1, winningTeam:1 ,team1id : element.team1id ,team2id : element.team2id }
        this.coupon.push(item);
        element.team1Checked = true
        element.team2Checked = false
        this.total = this.total * element.cotet1
        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet1

        }
        console.log("ee")
      }else{
        if(!element.team2Checked){
          let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet2 , winningTeam:2 ,team1id : element.team1id ,team2id : element.team2id  }
          this.coupon.push(item);
        element.team1Checked = false
        element.team2Checked = true
        this.total = this.total * element.cotet2

        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet2

        }
        console.log("ee")

      }
    }
 });
}

addBetow(item , value,name){
  this.betwow.forEach(element => {
    if(element.id == item.id){
      if(name === "cote1"){
        if(!element.team1Checked){
        let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet1, winningTeam:1 ,team1id : element.team1id ,team2id : element.team2id }
        this.coupon.push(item);
        element.team1Checked = true
        element.team2Checked = false
        this.total = this.total * element.cotet1
        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet1

        }
        console.log("ee")
      }else{
        if(!element.team2Checked){
          let item = {id : element.id ,team1: element.team1 ,team2: element.team2 , cote : element.cotet2 , winningTeam:2 , team1id : element.team1id ,team2id : element.team2id  }
          this.coupon.push(item);
        element.team1Checked = false
        element.team2Checked = true
        this.total = this.total * element.cotet2

        }else{
          let index = this.coupon.indexOf(element.id)
          this.coupon.splice(index,1)
          element.team1Checked = null
          element.team2Checked = null
          this.total = this.total / element.cotet2

        }
        console.log("ee")

      }
    }
 });
}
pressInput(value){
console.log(this.ammount)
}
deleteItem(item){
  console.log(item  ,"aaa")
  this.total = this.total /item.cote

  let index = this.coupon.indexOf(item.id)
  this.bet.forEach(element => {
      if(element.id  == item.id){
        element.team1Checked = null
        element.team2Checked = null
      }
  });
  this.coupon.splice(index,1)

}

PrivateKey = ""
registercoupon(){
 
  
 
 
    
    if(this.ammount  >= 1 ){
      this.dialogRef = this.matDialog.open(KeybetmodalComponent,{
        //  width : "80 %" ,
          panelClass : "custom-dialog-container"
        })
        this.dialogRef.afterClosed().subscribe(response =>{
          if(response != null && this.ammount >0 ){
          console.log(response)
          this.PrivateKey = response;
          console.log(this.coupon)
      console.log(this.ammount)
      let PublicAddress = "0x1AC7164E008D58bc02a51ea29041bE1f8eAFA8eA"
     
     // let PrivateKey =  "1eeb169fa03a6fb2e342cc311ada624ca291fe8a79746254eb6d941709cd5629"
      let geekspublic = "0xb1103661bA1736EC0C83931ce12851158b62875d"
    
    
        let userbetcoupon = new Betcoupon()
        userbetcoupon.coupongames = this.coupon 
        userbetcoupon.couponplayer = this.user.getLoggedInUser().id_user
        userbetcoupon.montant = this.ammount
        userbetcoupon.payementstatus = "to check"
         let x = this.ammount * this.total
        let res =  Math.round(x*100)/100
       
        userbetcoupon.potentielgain =  res
        userbetcoupon.status ="en cours"
        userbetcoupon.userpubkey = PublicAddress
          var  d = new  Date();  
        userbetcoupon.validatetime =  d ; 
        this.bser.addcoupon(userbetcoupon).subscribe(respc =>{
          
          
          userbetcoupon = null
        }
        )
      this.bser.sendcoupon(PublicAddress,geekspublic,this.PrivateKey,this.ammount).subscribe(response => {
       
        this.snackBar.openFromComponent(
          SnackbarComponent,
          
          {
              duration: 3000,
          }
          
      ); 
 
   
     });
     
      
      var drinkSelect = document.getElementById("spoz");
      drinkSelect.hidden= true
      this.ngOnInit();
    }
        
  }) 
  }
    else{
      console.log(this.ammount)
      var drinkSelect = document.getElementById("spoz");
      drinkSelect.hidden= false ;
    }
  
 

}


changelol(){
  
  if(this.detectlol!=0)
   
  {
 
  this.bet = []
  let tm1 : any;
  let tm2 : any;
  this.lolser.getalllolgamesbyserie(this.detectlol).subscribe(t=>{
      
    t.forEach(game => {
      
     let sg = new Singlegame()
     sg.id = game.id
     let ls = [];
    ls = game.opponents
      tm1 = ls[0]
     
      tm2 = ls[1]
      
      sg.team1 = tm1.opponent.acronym
      sg.team2 = tm2.opponent.acronym
      sg.team1id = tm1.opponent.id
      sg.team2id = tm2.opponent.id
      sg.time = game.begin_at
      sg.cotet1 = 1.7
      sg.cotet2 = 1.7 
      sg.team1Checked = null
      sg.team2Checked = null 
      sg.t1flasg  = tm1.opponent.image_url 
      sg.t2flash  = tm2.opponent.image_url 
      console.log(sg)
      this.bet.push(sg)
    
})
});
}else{
  this.bet = this.bbet
}
}
eelol(){
  console.log(this.dateselectedlol)
}


changecs(){
  this.betcsgo = [] ;
  if(this.detectcs !=0)  
  {
  console.log(this.detectcs)
 
  let tm1 : any;
  let tm2 : any;
  this.lolser.getallcsgamesbyserie(this.detectcs).subscribe(t=>{
      
    t.forEach(gamez => {
    
      let ZE = new Singlegame()
      ZE.id = gamez.id
      let ls = [];
    
     ls = gamez.opponents
       tm1 = ls[0]
       tm2 = ls[1]
       ZE.team1 = tm1.opponent.name
       ZE.team2 = tm2.opponent.name
       ZE.team1id = tm1.opponent.id
       ZE.team2id = tm2.opponent.id
       ZE.time = gamez.begin_at
       ZE.cotet1 = 1.7
       ZE.cotet2 = 1.7 
       ZE.team1Checked = null
       ZE.team2Checked = null 
       ZE.t1flasg  = tm1.opponent.image_url 
       ZE.t2flash  = tm2.opponent.image_url 
      
       this.betcsgo.push(ZE)
       
    
})
});
}else{
  this.betcsgo = this.csbetp
}
}
eecs(){
  console.log(this.dateselectedcs)
}


changedota(){
  console.log(this.detectdow)
}



eedota(){
  console.log(this.dateselectow)
}


clearcoupon(){
  this.coupon = []
  this.total  = 0 
  var drinkSelect = document.getElementById("spoz");
  drinkSelect.hidden= true
}

}
