import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;
  isLoggedIn: boolean = false;
  avatarUrl;
  
  constructor(
    private router: Router,
    private apiUser: UserApiService
  ) { }

  ngOnInit()
  {
    this.user = this.apiUser.getLoggedInUser();
    if (this.user == null)
    {
      this.isLoggedIn = false;
    }
    else
    {
      this.isLoggedIn = true;
    }
    this.avatarUrl = "http://51.178.25.45:1337/avatars/"+this.user.id_user+".jpg";
  }

  logoutUser()
  {
    localStorage.removeItem("geov_user");
    sessionStorage.removeItem("geov_user");
    location.reload();
  }

  goToSettings()
  {
    this.router.navigateByUrl("profile");
  }

}
