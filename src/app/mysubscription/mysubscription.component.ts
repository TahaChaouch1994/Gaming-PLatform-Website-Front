import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { UserApiService } from '../services/user-api.service';
import { User } from '../models/user';

@Component({
  selector: 'app-mysubscription',
  templateUrl: './mysubscription.component.html',
  styleUrls: ['./mysubscription.component.css']
})
export class MysubscriptionComponent implements OnInit {
  Subscriptions:Subscription[] = [];
  user= [];
  myuser:User;
  constructor( private subsApi: SubscribeApiService,  private userApi: UserApiService,) { }
 
  ngOnInit() {
  
  this.subsApi.getmysubscriptions(this.userApi.getLoggedInUser().id_user).subscribe(response => {
    this.Subscriptions = response
    for (let i = 0; i < this.Subscriptions.length; i++) {
      this.subsApi.getUserbyId(this.Subscriptions[i].idstreamer).subscribe(responses => {
  this.Subscriptions[i].nomstreamer=responses.username
    })
  }   
  })
}
}
