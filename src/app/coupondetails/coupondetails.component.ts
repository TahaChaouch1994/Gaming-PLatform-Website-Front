import { Betcoupon } from './../models/betcoupon';
import { Matchresultdetails } from './../models/matchresultdetails';
import { BetserviceService } from './../services/betservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Couponreport } from '../models/couponreport';
import { UserApiService } from './../services/user-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WalletApiService } from '../services/wallet-api.service';
@Component({
  selector: 'app-coupondetails',
  templateUrl: './coupondetails.component.html',
  styleUrls: ['./coupondetails.component.css']
})
export class CoupondetailsComponent implements OnInit {

  styleClass = {
    'color' : 'red'
  }
  userForm = new FormGroup({
    title : new FormControl('',[Validators.required,Validators.minLength(2)]),
    description :new FormControl('',[Validators.required,Validators.minLength(2)])
   
  })
  get  NameC(){
    return this.userForm.get('title')
  }
  get  DescriptionC(){
    return this.userForm.get('description')
  }
betsz = []
zz = []

w = 0 
betc : Betcoupon ;
  sbm = new Matchresultdetails()
bcop = []
numberwon =0
coupstatus : string
paystatus : string
userpublickey : string;
status : string
couponid : any
coupp : Betcoupon
idth : any
 i  = 0 
  constructor(
    private route : Router,
    private aroute : ActivatedRoute,
    public betser : BetserviceService,
    private apiUser: UserApiService,
    private apiwallet : WalletApiService,
  ) { }

  ngOnInit() {
    
    this.couponid = this.aroute.params.subscribe((params => {this.idth = params['id']}));
    this.apiwallet.userHasWallet(this.apiUser.getLoggedInUser().id_user).subscribe(ee=>{
    
      this.userpublickey = ee["adr"];
      console.log("aaaaaaaaaaaaaaaaaaa")
      console.log (ee)
      console.log("aaaaaaaaaaaaaaaaaaa")
    })
   this.aze()

    
      
     
     


  }
  aze(){


 
    this.betser.getcouponbyidc(this.idth).subscribe(i=>{
      this.coupstatus = i.status
      this.paystatus =  i.payementstatus
      this.zz = i.coupongames
      this.coupp = i ;
    
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
            this.numberwon +=1
            sbm.winner = 1
          }

          
          if(bd.winner.id === element.team2id && element.winningTeam === 2 )
          {
            sbm.result = "correct"
            this.numberwon +=1
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
          
          if(bd.winner=== null){
            sbm.result = "en cours"
            sbm.winner = 0
          }

          
       
          
  
          this.bcop.push(sbm)
            console.log("zzzzzzzzzzzzz")
          
            console.log(this.userpublickey)
            console.log("zzzzzzzzzzzzz")
          if(this.numberwon  === this.betsz.length)
          {
            cpo.status = "won"
            this.coupstatus == "won"
            let geekspublic = '0xe07657d21E49E74b38CD0B0F7eD9d032C99fB7bf';
            let geeksprivate ='7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
            let PublicAddress = "0x1AC7164E008D58bc02a51ea29041bE1f8eAFA8eA"
           let  PrivateKey= '7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
            // let PrivateKey =  "1eeb169fa03a6fb2e342cc311ada624ca291fe8a79746254eb6d941709cd5629"
             //let geekspublic = "0xb1103661bA1736EC0C83931ce12851158b62875d"
             let ammount = cpo.potentielgain
            this.betser.sendcoupon(geekspublic,this.userpublickey,geeksprivate,cpo.potentielgain).subscribe(response => {
              console.log(response)
       
   
       
         
           });
          }
          if(i < this.betsz.length && this.w === 0)
          {
            this.coupstatus == "encours"
            cpo.status = "en cours"
          }
          if(this.w > 0)
          {
            this.coupstatus == "lost"
            cpo.status = "lost"
          }
    
         
          this.betser.changestatus(cpo.couponid,cpo.status).subscribe()
        }
        
        )
     
      })
      }
    )
   } 


   addcouponreport(title,reportde){

   /* console.log("this is the logged i user pub key")
    console.log(this.userpublickey)
    let geekspublic = '0xe07657d21E49E74b38CD0B0F7eD9d032C99fB7bf';
    let geeksprivate ='7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
    let PublicAddress = "0x1AC7164E008D58bc02a51ea29041bE1f8eAFA8eA"
   let  PrivateKey= '7E465C95AF3B3741772865424973398A9A02A7680EADACD89CDC4ACD22A907B9';
   let userpppp = "0xEE1e33F4265eB1718c65408d90d7374E675bd8d6"
    // let PrivateKey =  "1eeb169fa03a6fb2e342cc311ada624ca291fe8a79746254eb6d941709cd5629"
     //let geekspublic = "0xb1103661bA1736EC0C83931ce12851158b62875d"
     let ammount = 100
     console.log(this.userpublickey)
    this.betser.sendcoupon(geekspublic,this.userpublickey,geeksprivate,ammount).subscribe(response => {

      console.log(response)



 
   });*/
  
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
