import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
  user: User;
  isLoggedIn: boolean;
  authType;
  errors = [];

  constructor(
    private router: Router,
    private apiUser: UserApiService,
  ) { }

  ngOnInit() {
    let str = sessionStorage.getItem("geov_user");
    if (str != null)
    {
      this.user = JSON.parse(str);
      this.isLoggedIn = true;
      this.authType = "session";
    }
    else
    {
      let str2 = localStorage.getItem("geov_user");
      if (str2 != null)
      {
        this.user = JSON.parse(str2);
        this.isLoggedIn = true;
        this.authType = "local";
      }
      else
      {
        this.user = null;
        this.isLoggedIn = false;
      }
    }
    if (!this.isLoggedIn)
    {
      this.router.navigateByUrl("/");
    }
  }

  updateProfile(confirmedPass)
  {
    console.log(this.user);
    let finalCheck = true;

    if (this.user.email == "")
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Email can't be empty.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Email can't be empty.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Email can't be empty.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Email can't be empty."), 1);
      }
    }

    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);

    if ((!emailValidation) && (this.user.email != ""))
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Wrong email format.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Wrong email format.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Wrong email format.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Wrong email format."), 1);
      }
    }

    if (this.user.username == "")
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Username can't be empty.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Username can't be empty.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Username can't be empty.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Username can't be empty."), 1);
      }
    }

    if (this.user.password == "")
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

    if ((this.user.password != confirmedPass) && (this.user.password != ""))
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Your passwords don't match.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Your passwords don't match.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Your passwords don't match.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Your passwords don't match."), 1);
      }
    }

    if (this.user.dob == null)
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Date of birth can't be empty.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Date of birth can't be empty.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Date of birth can't be empty.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Date of birth can't be empty."), 1);
      }
    }

    let today = new Date();
    let formatDay = new Date(this.user.dob);
    console.log("today : " + today);
    console.log("dob: " + this.user.dob);
    console.log("format: " + formatDay);
    if (formatDay > today)
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Date of birth is invalid.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("Date of birth is invalid.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "Date of birth is invalid.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("Date of birth is invalid."), 1);
      }
    }

    if (finalCheck)
    {
      this.user.status = "inactive";
      if (this.user.firstName == null)
      {
        this.user.firstName = "";
      }
      if (this.user.lastName == null)
      {
        this.user.lastName = "";
      }
      this.apiUser.updateUser(this.user).subscribe(response =>
        {
          if (response === "Username or email already used.")
          {
            let found = false;
            this.errors.forEach(element => {
              if (element === "Username or email already used.")
              {
                found = true;
              }
            });
            if (!found)
            {
              this.errors.push("Username or email already used.");
            }
          }
          else
          {
            this.errors.splice(this.errors.indexOf("Username or email already used."), 1);
            if (this.authType === "session")
            {
              sessionStorage.setItem("geov_user", JSON.stringify(this.user));
            }
            else
            {
              localStorage.setItem("geov_user", JSON.stringify(this.user));
            }
          }
        }
      );
    }
  }

}
