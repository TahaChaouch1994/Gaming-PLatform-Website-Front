import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../services/cart-api.service';
import { Order } from '../models/order';
import { UserMerch } from '../models/user-merch';
import { OrderApiService } from '../services/order-api.service';
import { UserApiService } from '../services/user-api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartMerch : UserMerch[] = [];
  order = new Order();
  subtotal = 0;
  encryptSecretKey = "6IAVE+56U5t7USZhb+9wCcqrTyJHqAu09j0t6fBngNo=";
  constructor(
    private cartApi : CartApiService,
    private orderApi : OrderApiService,
    private userApi : UserApiService
  ) { }

  ngOnInit() {
    let cart = this.cartApi.getUserCart();
    this.order.orderList = cart.orderList;
    this.order.date = new Date();
    this.order.state = "Unverified";
    this.order.user = this.userApi.getLoggedInUser().id_user;
    this.cartApi.convertMerchIDsToObjects().subscribe(response => {
      this.cartMerch = <UserMerch[]><unknown>response;
      this.cartMerch.forEach(element => {
        element["quantityToBuy"] = cart.orderList[element["_id"]];
        this.subtotal += element["quantityToBuy"] * element["price"];
      })
      console.log(this.cartMerch);
    })
  }

  encryptData(data) 
  {
    return CryptoJS.AES.encrypt(data.trim(), this.encryptSecretKey.trim()).toString();  
  }

  submitOrder()
  {
    this.order.privatekey = this.encryptData(this.order.privatekey);
    /*console.log(this.order);
    console.log("decrypting");
    console.log(this.decryptData(this.order.privatekey));*/
    this.orderApi.checkoutCart(this.order).subscribe(response => {
      console.log(response);
    })
  }
}
