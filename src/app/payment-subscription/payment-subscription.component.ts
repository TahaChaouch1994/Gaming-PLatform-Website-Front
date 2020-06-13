import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataSub } from '../subscription-request/subscription-request.component';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { UserApiService } from '../services/user-api.service';
import { BetserviceService } from '../services/betservice.service';


@Component({
  selector: 'app-payment-subscription',
  templateUrl: './payment-subscription.component.html',
  styleUrls: ['./payment-subscription.component.css']
})
export class PaymentSubscriptionComponent implements OnInit {
  ammount;
  constructor(
    public matDialogRef : MatDialogRef<PaymentSubscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSub,
    private subwApi: SubscribeApiService,
       private userApi: UserApiService,
       public bser:BetserviceService ,
  ) { }
  onNoClick(): void {
    this.matDialogRef.close();
  }
  ngOnInit() {
  }

  enterpublickey(it){
    if(it == "")
    {
      var drinkSelect = document.getElementById("keyprob");
      drinkSelect.hidden= false
    }
    else{
      let PublicAddress = "0x1AC7164E008D58bc02a51ea29041bE1f8eAFA8eA"
     
      // let PrivateKey =  "1eeb169fa03a6fb2e342cc311ada624ca291fe8a79746254eb6d941709cd5629"
       let geekspublic = "0xb1103661bA1736EC0C83931ce12851158b62875d"
      this.subwApi.subscribe(this.data.subscription).subscribe(response => {
        this.data.subscription._id = response;
        console.log(this.data.subscription);
      })
      this.bser.sendcoupon(PublicAddress,geekspublic,it,this.data.ammount).subscribe(response => {
       
        this.matDialogRef.close();
     });
  }
  }
}
