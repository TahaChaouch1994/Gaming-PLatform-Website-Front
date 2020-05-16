import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
 {

  errors = [];

  constructor(
    private apiUser: UserApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  verifyLogin(login, password, remember)
  {
    let finalCheck = true;
    
    if (login === "")
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Login can't be empty.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Login can't be empty.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Login can't be empty.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Login can't be empty."), 1);
      }
    }

    if (password === "")
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Password can't be empty.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Password can't be empty.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Password can't be empty.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Password can't be empty."), 1);
      }
    }

    if (finalCheck == true)
    {
      this.apiUser.loginUser(login, password).subscribe(response => {
        if (response === "Account not found.")
        {
          this.errors.splice(this.errors.indexOf("Wrong password."), 1);
          let found = false;
          this.errors.forEach(element => {
            if (element === "Account not found.")
            {
              found = true;
            }
          });
          if (!found)
          {
            this.errors.push("Account not found.");
          }
        }
        else if (response === "Wrong password.")
        {
          this.errors.splice(this.errors.indexOf("Account not found."), 1);
          let found = false;
          this.errors.forEach(element => {
            if (element === "Wrong password.")
            {
              found = true;
            }
          });
          if (!found)
          {
            this.errors.push("Wrong password.");
          }
        }
        else
        {
          this.errors.splice(this.errors.indexOf("Account not found."), 1);
          this.errors.splice(this.errors.indexOf("Wrong password."), 1);
          if (remember)
          {
            localStorage.setItem("geov_user", JSON.stringify(response));
          }
          else
          {
            sessionStorage.setItem("geov_user", JSON.stringify(response));
          }
          this.router.navigateByUrl("/").then(() => {
            window.location.reload();
          });
          console.log(response);
          if (remember)
          {
            let user = new User();
            user.id_user = response["_id"];
            user.email = response["email"];
            user.dob = response["dob"];
            user.username = response["username"];
            user.password = response["password"];
            user.role = response["role"];
            user.status = response["status"];
            user.firstName = response["firstName"];
            user.lastName = response["lastName"];
            user.lastActive = new Date();
            user.activity = "ONLINE";
            localStorage.setItem("geov_user", JSON.stringify(user));
            this.apiUser.updateUserActvity(user).subscribe(secondResponse => {
              this.router.navigateByUrl("/").then(() => {
                window.location.reload();
              });
            })
          }
          else
          {
            let user = new User();
            user.id_user = response["_id"];
            user.email = response["email"];
            user.dob = response["dob"];
            user.username = response["username"];
            user.password = response["password"];
            user.role = response["role"];
            user.status = response["status"];
            user.firstName = response["firstName"];
            user.lastName = response["lastName"];
            user.lastActive = new Date();
            user.activity = "ONLINE";
            sessionStorage.setItem("geov_user", JSON.stringify(user));
            this.apiUser.updateUserActvity(user).subscribe(secondResponse => {
              this.router.navigateByUrl("/").then(() => {
                window.location.reload();
              });
            })
          }
        }
      });
    }
  };

}
