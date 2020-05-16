import { UserApiService } from './../services/user-api.service';
import { element } from 'protractor';
import { Threadreact } from './../models/threadreact';
import { Postreact } from './../models/postreact';
import { Component, OnInit, ɵNO_CHANGE } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ForumServicesService } from '../services/forum-services.service';
import { Thread } from '../models/thread';

import { Replypost } from '../models/replypost';
@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {
  threadid : any;
  listposts : any
  didlike : number
  replys = [];
  constructor(
    private route : Router,
    private aroute : ActivatedRoute,
    private forumapi : ForumServicesService,
    
   private apiUser: UserApiService,
   
   ) { }
  idth : any
  private thrp : any;
 private uss : any;
  ngOnInit() {
    this.threadid = this.aroute.params.subscribe((params => {this.idth = params['id']}));
    this.forumapi.threadlikecheck(this.apiUser.getLoggedInUser().id_user,this.idth).subscribe(e=>{
      this.didlike = e ;
    })

     this.forumapi.getallpostsfromthreadid(this.idth).subscribe(item=>{
     console.log(item)
this.listposts  = item;
      item.forEach(element => {
        
  
        let repz : Replypost
      repz= new Replypost()
      repz.replytime = element.replytime
      repz.content = element.content;
      repz.sender = element.sender.id_user
      repz.threadid= element.threadid;
      repz.likes = element.likes 
      repz.dislikes = element.dislikes 
        let m : number ; 
        

        this.forumapi.postlikecheck(this.apiUser.getLoggedInUser().id_user,element._id).subscribe(p=>{
        repz.cani = p
        })
        if(element._id === this.apiUser.getLoggedInUser().id_user){
          repz.cani == 1
        }
        console.log("kakaka")
        console.log(repz)
        console.log("kakaka")
 
        
      });
      
     })
     
this.getthreadneeded();
  }

  getthreadneeded( ){
  
   this.forumapi.getthreaddetailsfromid(this.idth).subscribe(response => {
   
      this.thrp=response;
    
      this.uss = response.sender;
      
    
     
      
    })}

    addreply(content){

      let rep : Replypost
      rep= new Replypost()
      rep.replytime = new Date();
      rep.content = content;
      rep.sender = this.apiUser.getLoggedInUser();
      rep.threadid= this.idth;
      rep.likes = 0 
      rep.dislikes = 0 
      this.forumapi.createreply(rep).subscribe()  
      this.ngOnInit()
    }

    addlike(aze){
     

      this.forumapi.getpostfromid(aze).subscribe(item=>{
          
                let likez = item.likes  ;
                likez++;
                
                let rep : Postreact
                rep= new Postreact()
                rep.user = this.apiUser.getLoggedInUser().id_user
                rep.post = item._id
                this.forumapi.addliketopost(aze,likez).subscribe();
                this.forumapi.addpostraect(rep).subscribe();
                setTimeout(() => {  }, 3000);
                this.ngOnInit();
              });
              
              
    }
  
   
    adddislike(aze){
     

      this.forumapi.getpostfromid(aze).subscribe(item=>{
     
              });

                 }
    addliketothread(){

let likez = this.thrp.likes  ;
likez++;
console.log(likez)
this.forumapi.addliketothread(this.thrp._id,likez).subscribe();
let rept : Threadreact
rept= new Threadreact()
rept.user = this.apiUser.getLoggedInUser().id_user
rept.Thread = this.thrp._id
this.forumapi.addthreadreact(rept).subscribe();
setTimeout(() => {  }, 3000);
this.ngOnInit();
    }
   
  }
