import { Component, OnInit, } from '@angular/core';
import { ChatserviceService } from '../services/chatservice.service';
import { ActivatedRoute } from '@angular/router';
import { ChatmessageService } from '../services/chatmessage.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
 
})
export class ChatMessageComponent implements OnInit {
  toggled: boolean = false;
  msg: string = '';
  userId;

  private user:string="firas";
  private msgList:any[]=[];
  constructor(
    private chatservice: ChatmessageService,
    private route: ActivatedRoute,
 
  ) { }
  sendMessage()
{
  console.log('lehneee')
  
  
  
  this.chatservice.sendMessage(this.user,this.msg,this.userId);
  this.msg='';

}


handleSelection(event) {
  console.log(event.char);
  this.msg += event.char;
}
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
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