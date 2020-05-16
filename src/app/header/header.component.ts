import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;
  isLoggedIn: boolean = false;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit()
  {
    let str = sessionStorage.getItem("geov_user");
    if (str != null)
    {
      this.user = JSON.parse(str);
      this.isLoggedIn = true;
    }
    else
    {
      let str2 = localStorage.getItem("geov_user");
      if (str2 != null)
      {
        this.user = JSON.parse(str2);
        this.isLoggedIn = true;
      }
      else
      {
        this.user = null;
        this.isLoggedIn = false;
      }
    }
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
