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
import { ChatmessageService } from '../services/chatmessage.service';
import { Emoji } from '../models/emoji';
import { emojiService } from '../services/emoji.service';
import { SubscribeApiService } from '../services/subscribe-api.service';
import { Message } from '../models/message';


@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent implements OnInit {
  toggled: boolean = false;
  msg: string = '';
  userId;
  messageblock;
  currentuser;
  public isVisible: boolean = false;
  public issubscribe : boolean=false;
  public isDisabled:boolean=false;
  private user:string;
  imagetest;
  private msgList:Message[]=[];
  emojimages:any []=[];
  imagesbase:Emoji[] = [];
username;
  avatarUrl;
  isStreaming: boolean = false;
  canSendRequest: boolean = false;
  monprofil: boolean = false;
  addFriendButtonText;
  friendRequest = new FriendRequest();
  followreq=new Follow();
 subscription_id: string;
  game = "";
  gameImgUrl = "";
  btn_Subscribe:string="Subscribe";
  public btn_Follow :string="follow";
  inboundClick = false;
  avatarchat;
  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private friendsApi: FriendRequestService,
    private streamApi: StreamkeyApiService,
    private steamApi: SteamlinkService,
    private followApi: FollowApiService,
    public dialog: MatDialog,
    private chatservice: ChatmessageService,
    private emojiservice: emojiService,
    private subwApi: SubscribeApiService,  
  ) { }
  closealert(){
    this.isVisible = false;
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.currentuser=this.userApi.getLoggedInUser().id_user;
      this.avatarUrl = "http://localhost:1337/avatars/"+this.userId+".gif?"+(new Date()).getTime();
      this.avatarchat = "http://localhost:1337/avatars/"+this.userApi.getLoggedInUser().id_user+".jpg?"+(new Date()).getTime();
      let userstreamer=this.userApi.getLoggedInUser().id_user;
      this.isDisabled=false;
      this.chatservice.checkblock(this.userApi.getLoggedInUser().id_user,this.userId);
      this.chatservice.getcheckblock().subscribe(
        (res)=>{
          console.log(res)
          if(res.statut=="block")
          { this.isDisabled=true;}
          if(res.statut=="active")
          { this.isDisabled=false;}
        })
      this.subwApi.checksubscription(userstreamer,this.userId).subscribe(response => {
        if(response.length!=0 ||this.userId==this.userApi.getLoggedInUser().id_user)
             {
               this.issubscribe =false;
              } 
        else
            {
              this.issubscribe =true;
           }
        });
      
      if(this.userId==this.userApi.getLoggedInUser().id_user)
          {
            this.monprofil=true;
          
          }
      else
          {
            this.monprofil=false;
          }
     
      this.emojiservice.getimagebyuser(this.userId).subscribe(response => {
        //this.images.push( response);
            this.imagesbase=response;
            for (let i = 0; i < this.imagesbase.length; i++) 
            {
                  this.emojimages.push(this.imagesbase[i].urlimage);
   
            }
      
      })
     
      this.username=this.userApi.getLoggedInUser().username;
   
      this.chatservice.getMessages().subscribe(
        (res)=>{
          
               // console.log('the server res is ',res.room)
                if(res.room==this.userId &&res.type=="text")
              {  this.msgList.push(res)}
             // console.log(res.msg);
              //console.log(this.userApi.getLoggedInUser().id_user);
              if(res.type=="block"&&res.msg==this.userApi.getLoggedInUser().username&&res.room==this.userId)
              { 
                this.isDisabled=true;
                console.log("block");
              }
              if(res.type=="active"&&res.msg==this.userApi.getLoggedInUser().username&&res.room==this.userId)
              {
                this.isDisabled=false;
                console.log("active");
              }
              if(res.room==this.userId &&res.type=="image")
              {
                this.msgList.push(res)
              }
               },
              
        (err)=>
        {
          console.log('eroooooor',err)
        }
  
      )
      if (this.userId != this.userApi.getLoggedInUser().id_user)
      { this.inboundClick = true;
        console.log("yourprofile");
      }
      else{
        this.inboundClick = false;
        console.log("myprofile");
      }


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
          {  //this.inboundClick = true;

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
                url: 'http://149.202.41.135:1338/live/'+response["streamKey"]+'.flv'
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
   
    this.followreq.receiver = this.userId;
    this.followreq.sender =this.currentuser;
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
  
  



  sendMessage()
  {
    if(this.userId==this.userApi.getLoggedInUser().id_user)
    {
      if (this.msg.substring(0,6)==":block")
      {this.messageblock=this.msg.substring(7,this.msg.length);
     
         this.chatservice.sendMessage(this.username,this.messageblock,this.userId,'block');
         console.log(this.messageblock+"aaaaaaaaaaaaaaaaaa");
        console.log(this.msg.substring(0,6)+"ffffffffffffffff");}
       
       
       
      
        else if (this.msg.substring(0,7)==":active")
        {let messageblock=this.msg.substring(7,this.msg.length);
          this.chatservice.sendMessage(this.username,messageblock,this.userId,'active');
          console.log("sendactive");
         
        }
     
    else
  {
    this.chatservice.sendMessage(this.username,this.msg,this.userId,'text');
    this.msg='';
  }
}
    else
      {
        this.chatservice.sendMessage(this.username,this.msg,this.userId,'text');
        this.msg='';
      }
    
  
  
  }
  sendImage(emojiimage)
  {
  
    console.log(emojiimage);
    let messageimage="http://localhost:1337/emoji/"+emojiimage+".gif"
    this.chatservice.sendMessage(this.username,messageimage,this.userId,'image');
    this.msg='';
    this.isVisible = false;
  
  }
  newemoji()
  {
    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
  
  }
  
  handleSelection(event) {
    console.log(event.char);
    this.msg += event.char;
  }
  
}
