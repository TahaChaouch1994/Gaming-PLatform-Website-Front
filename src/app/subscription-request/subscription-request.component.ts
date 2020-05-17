import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../favoris/favoris.component';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { UserApiService } from '../services/user-api.service';
import { Subscription } from '../models/subscription';

@Component({
  selector: 'app-subscription-request',
  templateUrl: './subscription-request.component.html',
  styleUrls: ['./subscription-request.component.css']
})
export class SubscriptionRequestComponent implements OnInit {
  myDate:Date=new Date();
DATEx:Date=new Date();
  subscription = new Subscription()
  constructor( public dialogRef: MatDialogRef<SubscriptionRequestComponent>,
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
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })
    
  }
  submitsubscribe2()
  {
    let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+3);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="2"
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })
    
  }
  submitsubscribe3()
  {
    let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+12);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="3"
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })
    
  }
}
