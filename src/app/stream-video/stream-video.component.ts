import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import FlvJs from 'flv.js';
import { StreamkeyApiService } from '../services/streamkey-api.service';
import { UserApiService } from '../services/user-api.service';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendRequest } from '../models/friend-request';
import { SteamlinkService } from '../services/steamlink.service';
import { Follow } from '../models/follow';
import { SubscriptionRequestComponent } from '../subscription-request/subscription-request.component';
import { FollowApiService } from '../services/follow-api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent implements OnInit {

  userId;
  user = "";
  avatarUrl;
  isStreaming: boolean = false;
  canSendRequest: boolean = false;
  addFriendButtonText;
  friendRequest = new FriendRequest();
  followreq=new Follow();
 subscription_id: string;
  game = "";
  gameImgUrl = "";
  btn_Subscribe:string="Subscribe";
  public btn_Follow: string = 'Follow';

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private friendsApi: FriendRequestService,
    private streamApi: StreamkeyApiService,
    private steamApi: SteamlinkService,
    private followApi: FollowApiService,
    public dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.avatarUrl = "http://localhost:1337/avatars/"+this.userId+".jpg?"+(new Date()).getTime();
      this.friendsApi.getUserFriends(this.userApi.getLoggedInUser().id_user).subscribe(response2 => {
        let friendships = response2[0]["friendsList"];
        this.canSendRequest = true;
        this.addFriendButtonText = "Add as friend";
        friendships.forEach(element => {
          if (element._id === this.userId)
          {
            this.canSendRequest = false;
          }
        });
        if (this.canSendRequest === true)
        {
          if (this.userId != this.userApi.getLoggedInUser().id_user)
          {
            this.friendsApi.hasRequestForReceiver(this.userApi.getLoggedInUser().id_user, this.userId).subscribe(response => 
            {
              if (response.length == 0)
              {
                this.canSendRequest = true;
                this.addFriendButtonText = "Add as friend";
              }
              else
              {
                this.canSendRequest = true;
                this.addFriendButtonText = "Delete Request";
                this.friendRequest._id = response[0]["_id"];
                this.friendRequest.date = response[0]["date"];
                this.friendRequest.sender = this.userApi.getLoggedInUser().id_user;
                this.friendRequest.receiver = this.userId;
              }
          })
          }
        }
      })
    });
    this.userApi.getUserFromId(this.userId).subscribe(response => {
      this.user = response;
    })
    this.streamApi.getUserStreamKey(this.userId).subscribe(response => {
      if (FlvJs.isSupported()) {
        console.log(response["streamKey"]);
        this.streamApi.getAllStreams(response["streamKey"]).subscribe(resp2 => {
          if (resp2["live"] != undefined)
          {
            if (resp2["live"][response["streamKey"]] != undefined)
            {
              this.isStreaming = true;
              const videoElement =  <HTMLAudioElement>document.getElementById('videoElement');
              const flvPlayer = FlvJs.createPlayer({
                type: 'flv',
                url: 'http://localhost:1338/live/'+response["streamKey"]+'.flv'
              });
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
              flvPlayer.play();
            }
          }
        });
      }
      this.steamApi.getUserSteamId(this.userId).subscribe(response => {
        this.game = response;
        this.steamApi.getPlayerGames(this.game["steamID"]).subscribe(ownedGamesResponse => {
          let arr = <String[]><unknown>ownedGamesResponse;
          arr.forEach(element => {
            if (element["appID"] == this.game["gameID"])
            {
              this.gameImgUrl = element["logoURL"];
            }
          })
        });
      });
    })
  }

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  addAsFriend()
  {
    let currentUser = this.userApi.getLoggedInUser();
    this.friendRequest.date = new Date();
    this.friendRequest.receiver = this.userId;
    this.friendRequest.sender = currentUser.id_user;
    if (this.addFriendButtonText === "Add as friend")
    {
      console.log("add request");
      delete this.friendRequest._id;
      this.friendsApi.sendFriendRequest(this.friendRequest).subscribe(response => {
        this.friendRequest._id = response;
        console.log(this.friendRequest);
        this.addFriendButtonText = "Delete Request";
      });
    }
    else
    {
      console.log("delete request");
      console.log(this.friendRequest._id);
      this.friendsApi.revokeFriendRequest(this.friendRequest._id).subscribe(response => {
        console.log(response);
        this.addFriendButtonText = "Add as friend";
      })
    }
  }
  Follow()
  {
   let currentUser = this.userApi.getLoggedInUser();
    this.followreq.receiver = this.userId;
    this.followreq.sender =currentUser.id_user;
    if(this.btn_Follow === 'Follow') { 
     
      delete this.followreq._id;
      this.followApi.followingApi(this.followreq).subscribe(response => {
        this.followreq._id = response;
        console.log(this.followreq);
       
      })
      this.btn_Follow = 'UnFollow'
    } else {
      this.btn_Follow = 'Follow'
    }
  }
  Subscribe()
  {
    const dialogRef = this.dialog.open(SubscriptionRequestComponent, {
      width: '450px',
      data: {name: this.userId, subscription_id: this.subscription_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.subscription_id = result;
    });
  } 
}
