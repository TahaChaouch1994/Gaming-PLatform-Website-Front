import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { Thread } from '../models/thread';
import { UserApiService } from '../services/user-api.service';
import { ForumServicesService } from '../services/forum-services.service';
import { Subreddits } from '../models/subreddits';
import { Threadsview } from '../models/threadsview';

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrls: ['./list-threads.component.css']
})
export class ListThreadsComponent implements OnInit {
  topicid : any;
  fileData: File = null;
  previewUrl:any = null;
  listth : any
  listviewstops = []
  listpost : []
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  avatarUrl;
   tpc : Subreddits
  constructor(
   private route : Router,
   private aroute : ActivatedRoute,
   private apiUser: UserApiService,
   private forumapi : ForumServicesService,
   
   
  ) { }
    idt : any
    fileToUpload: File = null;
  ngOnInit() {
    this.topicid = this.aroute.params.subscribe((params => {this.idt = params['id']}));
   this. getlistthreadsbytopicid();
    this.gettopicneeded(this.idt);}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
   
    console.log(this.fileToUpload);
}


fileProgress(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.preview();
}

preview() {
// Show preview 
var mimeType = this.fileData.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}

var reader = new FileReader();      
reader.readAsDataURL(this.fileData); 
reader.onload = (_event) => { 
  this.previewUrl = reader.result; 
}
}


/*getthreadbyid( idt){

 this.forumapi.getThreadfromid(idt).subscribe(response => {
  let  thr : Thread
  thr = new Thread();
  response.forEach(element => {


   
 thr.id = element._id;
 thr.title = element.title;
  thr.addtime = element.addtime;
  thr.sender = element.sender
  thr.description = element.description

  
  });
  console.log(thr);
  return thr;
  
});

}*/

gettopicneeded( idt){
  
  this.forumapi.gettopicfrom(this.idt).subscribe(response => {
    
   this.tpc = response;
   return this.tpc;
   
    
  })



   
 }

 getlistthreadsbytopicid()
 {
  
  this.forumapi.getallThreadsfromid(this.idt).subscribe(response => {
    
  this.listth = response;
  
  
  this.listth.forEach(element => {


    let threadv = new Threadsview();
    threadv.id = element._id;

    threadv.description = element.description;
    threadv.addtime = element.addtime
    threadv.sender = element.sender
    threadv.title = element.title
    threadv.subreddit = element.subreddit
     this.forumapi.getallpostsfromthreadid(element._id).subscribe(p =>{
  
      this.listpost = p ;
      threadv.numberofposts = this.listpost.length
      
      threadv.lastpost = this.listpost[length]
      
      this.listviewstops.push(threadv)
    })
    
   
 
 
  
  
   });
    
  })

 }
addattachemnt(title,description){

  let th : Thread
  th= new Thread()
  th.addtime = new Date();
  th.description = description;
  th.sender = this.apiUser.getLoggedInUser();
  th.title= title;
  th.likes = 0 ; 
  th.dislikes = 0 ;
  th.subreddit = this.tpc
  this.forumapi.createThread(th).subscribe(response =>{
    th.id = response; 
    const formData = new FormData();  
    formData.append('file', this.fileData, th.id +'.jpg');
    this.forumapi.uploadthreadattachement(formData).subscribe(resp => {
      
      this.avatarUrl = "http://localhost:1337/thread_attachements/"+th.id+".jpg?";
    })
  })
  this.ngOnInit()
    
  
}

/*onSubmit() {
const formData = new FormData();
  formData.append('file', this.fileData);
  this.http.post('url/to/your/api', formData)
    .subscribe(res => {
      console.log(res);
      this.uploadedFilePath = res.data.filePath;
      alert('SUCCESS !!');
    })
}*/
 /* uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }*/
  gotoyhreadsdetail(item)
  {
    
    this.route.navigate([ "/ThreadDetails" ,{id : item["id"]}]);
    

  }
}
