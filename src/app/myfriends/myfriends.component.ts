import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FriendRequestService } from '../services/friend-request.service';
import { UserApiService } from '../services/user-api.service';
import { Friendships } from '../models/friendships';

@Component({
  selector: 'app-myfriends',
  templateUrl: './myfriends.component.html',
  styleUrls: ['./myfriends.component.css']
})
export class MyfriendsComponent implements OnInit 
{
  user : User;
  friendShips = "";

  constructor(
    private userApi:UserApiService,
    private friendsApi:FriendRequestService,
  ) { }

  ngOnInit() {
    this.user = this.userApi.getLoggedInUser();
    this.friendsApi.getUserFriends(this.user.id_user).subscribe(response => {
      this.friendShips = response[0];
      console.log(this.friendShips["friendsList"][0]["_id"]);
    })
  }

  deleteFriend(friend)
  {
    this.friendsApi.deleteFriend(this.user.id_user, friend._id).subscribe(response => 
      {
        location.reload();
      })
  }

}
