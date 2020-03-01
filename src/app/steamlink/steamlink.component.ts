import { Component, OnInit } from '@angular/core';
import { SteamlinkService } from '../services/steamlink.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-steamlink',
  templateUrl: './steamlink.component.html',
  styleUrls: ['./steamlink.component.css']
})
export class SteamlinkComponent implements OnInit {

  user;
  hasSteam:boolean = false;
  steamAccount = "";
  steamKey = "";
  ownedGames = "";

  constructor(
    private userApi: UserApiService,
    private steamLink: SteamlinkService
  ) { }

  ngOnInit() {
    this.user = this.userApi.getLoggedInUser();
    this.steamLink.getUserSteamId(this.user.id_user).subscribe(response => {
      if (response === "")
      {
        this.hasSteam = false;
      }
      else
      {
        this.hasSteam = true;
        this.steamAccount = response;
        this.steamKey = response["steamID"];
        this.steamLink.getPlayerGames(this.steamKey).subscribe(response2 => {
          console.log(response2);
          this.ownedGames = response2;
        })
      }
    })
  }

  goToSteam()
  {
    window.location.href = "http://51.178.25.45:1337/auth/steam?user="+this.user.id_user;
  }

  unlinkSteam()
  {
    this.steamLink.deleteSteamAccount(this.user.id_user).subscribe(response => {
      location.reload();
    })
  }

}
