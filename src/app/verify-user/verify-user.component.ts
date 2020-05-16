import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  userId;
  key;
  isValidated = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUser: UserApiService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.key = params['key'];
    });
    if ((this.userId == null) || (this.key == null))
    {
      this.router.navigateByUrl("/").then(() => {
        window.location.reload();
      });
    }
    let user = this.apiUser.getLoggedInUser();
    if ((user != null) && (user.status === "activated"))
    {
      this.router.navigateByUrl("/").then(() => {
        window.location.reload();
      });
    }
    this.apiUser.verifyUser(this.userId, this.key).subscribe(response => {
      console.log(response);
      if (response === "This code is invalid")
      {
        this.isValidated = false;
        this.router.navigateByUrl("/").then(() => {
          window.location.reload();
        });
      }
      else if (response === "Success")
      {
        this.isValidated = true;
        console.log("updating user");
        if (user != null)
        {
          console.log("found user");
          user.status = "activated";
          let storage = this.apiUser.getSessionInfo();
          if (storage === "local")
          {
            console.log("local");
            localStorage.removeItem("geov_user");
            localStorage.setItem("geov_user", JSON.stringify(user));
          }
          else if (storage === "session")
          {
            console.log("session");
            sessionStorage.removeItem("geov_user");
            sessionStorage.setItem("geov_user", JSON.stringify(user));
          }
        }
      }
    })
  }

}
