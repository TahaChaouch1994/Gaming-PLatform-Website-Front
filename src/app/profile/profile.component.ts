import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { WalletApiService } from '../services/wallet-api.service';
import { StreamkeyApiService } from '../services/streamkey-api.service';
import { ClipboardService } from 'ngx-clipboard'

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
  updatedSucess: boolean = false;
  hasWallet: boolean;
  getWalletTab: boolean = false;
  walletBalance = "0";
  askForPassword: boolean = false;
  unlinkError;
  streamKey;
  errors = [];

  constructor(
    private router: Router,
    private apiUser: UserApiService,
    private apiWallet: WalletApiService,
    private apiStream: StreamkeyApiService,
    private _clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    this.user = this.apiUser.getLoggedInUser();
    this.authType = this.apiUser.getSessionInfo();
    if (this.user == null)
    {
      this.router.navigateByUrl("/");
    }
    else
    {
      this.apiWallet.userHasWallet(this.user.id_user).subscribe(response => {
        console.log(response);
        if (response === "None")
        {
          this.hasWallet = false;
        }
        else
        {
          this.hasWallet = true;
          this.walletBalance = response;
        }
      });
      this.apiStream.getUserStreamKey(this.user.id_user).subscribe(response => {
        this.streamKey = response["streamKey"];
      })
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
            this.updatedSucess = true;
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

  walletFirstForm(here, there) 
  {
    if (there == true)
    {
      this.getWalletTab = true;
    }
    else if (here == true)
    {
      this.apiWallet.createWallet(this.user.id_user, this.user.email).subscribe(response => {
        console.log(response);
        location.reload();
      })
    }
  }

  walletSecondForm(private_key)
  {
    console.log(private_key);
    this.apiWallet.privateKeyToAccount(this.user.id_user, private_key).subscribe(response => {
      console.log(response);
      location.reload();
    })
  }

  goBackToFirstWalletForm()
  {
    this.getWalletTab = false;
  }

  unlink()
  {
    this.askForPassword = true;
  }

  confirmUnlink(password)
  {
    console.log(password);
    if (password === this.user.password)
    {
      this.apiWallet.unlinkWallet(this.user.id_user).subscribe(response =>
        {
          console.log(response);
          location.reload();
        });
    }
    else
    {
      this.unlinkError = "Wrong password";
    }
  }

  closeUnlinkForm()
  {
    this.askForPassword = false;
  }

  copyStreamKey(inputElement){
    inputElement.select();
    document.execCommand('copy');
  }

  copy(text: string){
    this._clipboardService.copyFromContent(this.streamKey);
  }

  resetStreamKey()
  {
    this.apiStream.updateUserStreamKey(this.user.id_user).subscribe(response =>
    {
      this.streamKey = response;
    });
  }

}
