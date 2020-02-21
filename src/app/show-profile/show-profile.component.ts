import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';
import { UserMerch } from '../models/user-merch';
import { UsermerchService } from '../services/usermerch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  userId;
  listMerch;
  user;
  
  constructor(
    private route: ActivatedRoute,
    public userApi : UserApiService,
    public merchApi : UsermerchService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.userApi.getUserFromId(this.userId).subscribe(response => {
        this.user = response;
        this.merchApi.getUserMerch(this.userId).subscribe(resp => {
          this.listMerch = resp;
        });
      })
    });
  }

}
