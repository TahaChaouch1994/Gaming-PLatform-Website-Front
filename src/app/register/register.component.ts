import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  user = new User();
  errors = [];

  constructor(
    private apiUser: UserApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register(myform, agree, confirm_pass) 
  {
    let finalCheck = true;

    if (this.user.email == null)
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

    if ((!emailValidation) && (this.user.email != null))
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

    if (this.user.username == null)
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

    if (this.user.password == null)
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

    if ((this.user.password != confirm_pass) && (this.user.password != null))
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

    if (!agree)
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "You must agree with our terms of use.")
        {
          found = true;
        }
      });
      if (!found)
      {
        this.errors.push("You must agree with our terms of use.");
      }
      finalCheck = false;
    }
    else
    {
      let found = false;
      this.errors.forEach(element => {
        if (element === "You must agree with our terms of use.")
        {
          found = true;
        }
      });
      if (found)
      {
        this.errors.splice(this.errors.indexOf("You must agree with our terms of use."), 1);
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
      this.user.role = "user";
      this.user.status = "inactive";
      if (this.user.firstName == null)
      {
        this.user.firstName = "";
      }
      if (this.user.lastName == null)
      {
        this.user.lastName = "";
      }
      this.apiUser.createUser(this.user).subscribe(response =>
        {
          console.log(response);
          console.log("type is : "+typeof(response));
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
            this.user.id_user = response;
            this.router.navigateByUrl("account-registered").then(() => {
              window.location.reload();
            });
          }
        }
      );
    }
  }

}
