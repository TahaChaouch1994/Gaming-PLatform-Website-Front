import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';
import { UserMerch } from '../models/user-merch';
import { UsermerchService } from '../services/usermerch.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  listMerch;
  user: User;
  
  constructor(
    public userApi : UserApiService,
    public merchApi : UsermerchService,
  ) { }

  ngOnInit() {
    this.user = this.userApi.getLoggedInUser();
    this.merchApi.getUserMerch(this.user.id_user).subscribe(response => {
      this.listMerch = response;
    });
  }

}
