import { Component, OnInit, } from '@angular/core';
import { ChatserviceService } from '../services/chatservice.service';
import { ActivatedRoute } from '@angular/router';
import { ChatmessageService } from '../services/chatmessage.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
 
})
export class ChatMessageComponent implements OnInit {
  toggled: boolean = false;
  msg: string = '';
  userId;
  public isVisible: boolean = false;
  private user:string;
  imagetest;
  private msgList:any[]=[];
  private images:any[]=["hey","firas","eyy","hey","firas","eyy","hey"];
  constructor(
    private userApi: UserApiService,
    private chatservice: ChatmessageService,
    private route: ActivatedRoute,
 
  ) { }
  sendMessage()
{

  console.log("fffffffffffffffffffffff"+this.userId);
  this.chatservice.sendMessage(this.user,this.msg,this.userId,'text');
  this.msg='';

}
sendImage(avatarUrl)
{

  console.log(avatarUrl);
  this.chatservice.sendMessage(this.user,avatarUrl,this.userId,'image');
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
 
  ngOnInit(): void {
  
    
    this.user=this.userApi.getLoggedInUser().username
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  
    this.chatservice.getMessages().subscribe(
      (res)=>{
console.log('the server res is ',res)
this.msgList.push(res)
      },
      (err)=>
      {
        console.log('eroooooor',err)
      }

    )
  

}
}