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

public myDate:Date=new Date();
public DATEx:Date=new Date();
public isVisible: boolean = false;
public description: String = "";
public subscription = new Subscription();
  constructor( 
    public dialogRef: MatDialogRef<SubscriptionRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private subwApi: SubscribeApiService,  
    private userApi: UserApiService,
    ) {
      }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  submitsubscribe1()
  {

   /* let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+1);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="1"
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })*/
      this.description=" one month";
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        
      
    
  }
  no()
  {
    this.isVisible = false;
    console.log("alert fermé")
    
  }
  yes()
  {
    if(this.description== " one month")
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
    
      setTimeout(()=> this.isVisible = false,500)
      setTimeout(()=> this.dialogRef.close(),800) ;
    }
    if(this.description== " six month")
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
    
      setTimeout(()=> this.isVisible = false,500)
      setTimeout(()=> this.dialogRef.close(),800) ;
    }
    if(this.description== " one year")
    {
      let currentUser = this.userApi.getLoggedInUser();
      this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
      this.subscription.idstreamer =this.data.name;
      this.DATEx.setMonth(this.myDate.getMonth()+12);
      this.subscription.dateex =this.DATEx;
      this.subscription.level="3"
        this.subwApi.subscribe(this.subscription).subscribe(response => {
          this.subscription._id = response;
          console.log(this.subscription);})
    
      setTimeout(()=> this.isVisible = false,500)
      setTimeout(()=> this.dialogRef.close(),800) ;
    }
    else
    {
      console.log("mahiyech")
    }
  }
  submitsubscribe2()
  {/*
    let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+3);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="2"
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })*/
    
      this.description=" six month";
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      
  }
  submitsubscribe3()
  {/*
    let currentUser = this.userApi.getLoggedInUser();
    this.subscription.iduser = this.userApi.getLoggedInUser().id_user;
    this.subscription.idstreamer =this.data.name;
    this.DATEx.setMonth(this.myDate.getMonth()+12);
    this.subscription.dateex =this.DATEx;
    this.subscription.level="3"
      this.subwApi.subscribe(this.subscription).subscribe(response => {
        this.subscription._id = response;
        console.log(this.subscription);
       
      })*/
      this.description=" one year";
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        
    
  }
}
