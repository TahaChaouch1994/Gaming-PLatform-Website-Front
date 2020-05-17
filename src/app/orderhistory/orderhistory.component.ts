import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { OrderApiService } from '../services/order-api.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  user: User;
  listOrders;

  constructor(
    private ordersApi: OrderApiService,
    private usersApi: UserApiService
  ) { }

  ngOnInit() {
    this.user = this.usersApi.getLoggedInUser();
    this.ordersApi.getUserOrderHistory(this.user.id_user).subscribe(response => {
      this.listOrders = response;
    })
  }

}
