import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-mysubscription',
  templateUrl: './mysubscription.component.html',
  styleUrls: ['./mysubscription.component.css']
})
export class MysubscriptionComponent implements OnInit {
  Subscriptions:Subscription[] = [];
  constructor( private subsApi: SubscribeApiService,  private userApi: UserApiService,) { }
 
  ngOnInit() {
  
  this.subsApi.getmysubscriptions(this.userApi.getLoggedInUser().id_user).subscribe(response => {
    this.Subscriptions = response
  
  })
}
}
