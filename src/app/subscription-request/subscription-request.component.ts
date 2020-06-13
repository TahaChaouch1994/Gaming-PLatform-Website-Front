import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../favoris/favoris.component';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { UserApiService } from '../services/user-api.service';
import { Subscription } from '../models/subscription';
import { PaymentSubscriptionComponent } from '../payment-subscription/payment-subscription.component';
import { BetserviceService } from '../services/betservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../snackbar/snackbar.component';


export interface DialogDataSub {

  name: string;
  loggedUser: string, 
  currentUser: string,
  ammount:number,
  subscription:Subscription
}
@Component({
  selector: 'app-subscription-request',
  templateUrl: './subscription-request.component.html',
  styleUrls: ['./subscription-request.component.css']
})
export class SubscriptionRequestComponent implements OnInit {
  myDate:Date=new Date();
  dialogRefp  : any ; 

DATEx:Date=new Date();
PrivateKey;
  subscription = new Subscription()
  constructor( public dialogRef: MatDialogRef<SubscriptionRequestComponent>,
    private matDialog : MatDialog,
    private snackBar : MatSnackBar,
    public bser:BetserviceService ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private subwApi: SubscribeApiService,   private userApi: UserApiService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  submitsubscribe1()
  {
    
    let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+1);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="1"
      this.dialogRefp = this.matDialog.open(PaymentSubscriptionComponent,{
        //  width : "80 %" ,
          panelClass : "custom-dialog-container",
          data: {
            loggedUser: this.subscription.iduser, 
            currentUser: this.subscription.idstreamer,
            subscription:this.subscription,
            ammount:5}
        })
        /*this.dialogRef.afterClosed().subscribe(response =>{
          console.log("response")
          if(response != null){
          console.log("response")
          this.PrivateKey = response;
          //console.log(this.coupon)
      //console.log(this.ammount)
      let PublicAddress = "0x1AC7164E008D58bc02a51ea29041bE1f8eAFA8eA"
     
     // let PrivateKey =  "1eeb169fa03a6fb2e342cc311ada624ca291fe8a79746254eb6d941709cd5629"
      let geekspublic = "0xb1103661bA1736EC0C83931ce12851158b62875d"
      this.ammount=1;
      
          this.subwApi.subscribe(this.subscription).subscribe(response => {
            this.subscription._id = response;
            console.log(this.subscription);
          })
        
    
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


    */
  }
  submitsubscribe2()
  {
    {
      let currentUser = this.userApi.getLoggedInUser();
      this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
      this.subscription.idstreamer =this.data.name;
      this.DATEx.setMonth(this.myDate.getMonth()+3);
      this.subscription.dateex =this.DATEx;
      this.subscription.level="2"
      this.dialogRefp = this.matDialog.open(PaymentSubscriptionComponent,{
        //  width : "80 %" ,
          panelClass : "custom-dialog-container",
          data: {
            loggedUser: this.subscription.iduser, 
            currentUser: this.subscription.idstreamer,
            subscription:this.subscription,
            ammount:25}
        })
      
  
      }
    
  }
  submitsubscribe3()
  {
    {
      let currentUser = this.userApi.getLoggedInUser();
      this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
      this.subscription.idstreamer =this.data.name;
      this.DATEx.setMonth(this.myDate.getMonth()+12);
      this.subscription.dateex =this.DATEx;
      this.subscription.level="3"
      this.dialogRefp = this.matDialog.open(PaymentSubscriptionComponent,{
        //  width : "80 %" ,
          panelClass : "custom-dialog-container",
          data: {
            loggedUser: this.subscription.iduser, 
            currentUser: this.subscription.idstreamer,
            subscription:this.subscription,
            ammount:41}
        })
      
    
      }
}
}
