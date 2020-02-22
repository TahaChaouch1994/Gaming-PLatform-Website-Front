import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import FlvJs from 'flv.js';
import { StreamkeyApiService } from '../services/streamkey-api.service';
import { UserApiService } from '../services/user-api.service';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendRequest } from '../models/friend-request';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent implements OnInit {

  userId;
  user;
  avatarUrl;
  isStreaming: boolean = false;
  canSendRequest: boolean = false;
  addFriendButtonText;
  friendRequest = new FriendRequest();

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private friendsApi: FriendRequestService,
    private streamApi: StreamkeyApiService
  ) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
    this.userApi.getUserFromId(this.userId).subscribe(response => {
      this.user = response;
    })
    this.streamApi.getUserStreamKey(this.userId).subscribe(response => {
      if (FlvJs.isSupported()) {
        console.log(response["streamKey"]);
        this.streamApi.getAllStreams(response["streamKey"]).subscribe(resp2 => {
          if (resp2["live"][response["streamKey"]] != undefined)
          {
            this.isStreaming = true;
            const videoElement =  <HTMLAudioElement>document.getElementById('videoElement');
            const flvPlayer = FlvJs.createPlayer({
              type: 'flv',
              url: 'http://51.178.25.45:1338/live/'+response["streamKey"]+'.flv'
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
          }
        });
      }
    })
    this.avatarUrl = "http://51.178.25.45:1337/avatars/"+this.userId+".jpg?"+(new Date()).getTime();
    if (this.userId != this.userApi.getLoggedInUser().id_user)
    {
      this.friendsApi.hasRequestForReceiver(this.userApi.getLoggedInUser().id_user, this.userId).subscribe(response => {
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
        console.log(response);
    })
    }
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
}
