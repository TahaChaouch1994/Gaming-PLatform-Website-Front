import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendRequest } from '../models/friend-request';
import { CartApiService } from '../services/cart-api.service';
import { UserMerch } from '../models/user-merch';
import { User } from '../models/user';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User;
  isLoggedIn: boolean = false;
  avatarUrl;
  friendshipRequests:FriendRequest[] = [];
  friendshipUsers;
  cartMerch = "";
  
  constructor(
    private router: Router,
    private apiUser: UserApiService,
    private friendsApi : FriendRequestService,
    private cartApi : CartApiService,
    private userIdle: UserIdleService
  ) { }

  ngOnInit()
  {
    /*this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));*/
    this.cartApi.convertMerchIDsToObjects().subscribe(response => {
      this.cartMerch = response;
    })
    this.user = this.apiUser.getLoggedInUser();
    if (this.user == null)
    {
      this.isLoggedIn = false;
    }
    else
    {
      this.isLoggedIn = true;
    }
    this.avatarUrl = "http://localhost:1337/avatars/"+this.user.id_user+".jpg";
    this.friendsApi.getUserFriendRequests(this.user.id_user).subscribe(response =>
      {
        const myArray = <FriendRequest[]><unknown>response;
        this.friendshipRequests =  myArray;
      }
    )
  }

  logoutUser()
  {
    localStorage.removeItem("geov_user");
    sessionStorage.removeItem("geov_user");
    this.user.lastActive = new Date();
    this.user.activity = "OFFLINE";
    this.apiUser.updateUserActvity(this.user).subscribe(response => {
      location.reload();
    })
  }

  goToSettings()
  {
    this.router.navigateByUrl("profile");
  }

  goToOrders()
  {
    this.router.navigateByUrl("manage-orders");
  }

  acceptRequest(request)
  {
    console.log(request);
    this.friendsApi.acceptFriendRequest(request).subscribe(response =>
      {
        this.friendshipRequests.forEach((element, index) =>
        {
          if (request._id === element._id)
          {
            this.friendshipRequests.splice(index, 1);
          }
        });
      });
  }

  deleteRequest(request)
  {
    this.friendsApi.revokeFriendRequest(request._id).subscribe(response => {
      this.friendshipRequests.forEach((element, index) =>
      {
        if (request._id === element._id)
        {
          this.friendshipRequests.splice(index, 1);
        }
      })
    })
  }

  deleteFromCart(merch)
  {
    const myArray = <UserMerch[]><unknown>this.cartMerch;
    this.cartApi.removeItemFromCart(merch._id);
    let index = myArray.indexOf(merch);
    myArray.splice(index, 1);
    this.cartMerch = <string><unknown>myArray;
  }
}
