import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { Thread } from '../models/thread';
import { UserApiService } from '../services/user-api.service';
import { ForumServicesService } from '../services/forum-services.service';
import { Subreddits } from '../models/subreddits';

@Component({
  selector: 'app-list-threads',
  templateUrl: './list-threads.component.html',
  styleUrls: ['./list-threads.component.css']
})
export class ListThreadsComponent implements OnInit {
  topicid : any;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
   private route : Router,
   private aroute : ActivatedRoute,
   private apiUser: UserApiService,
   private forumapi : ForumServicesService
  ) { }
    idt : any
    fileToUpload: File = null;
  ngOnInit() {
    this.topicid = this.aroute.params.subscribe((params => {this.idt = params['id']}));
    console.log( this.idt);
    this.getthreadsbysubredditid(this.idt.Topicname);
  }

  getthreadsbysubredditid(idt){


  }
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


addattachemnt(title,description){
  console.log(title + "lllllllllllllllllllllllll"+description+ "fileeeeeeee"+this.fileData.name) ;
  let th : Thread
  th= new Thread()
  th.addtime = new Date();
  th.description = description;
  th.sender = this.apiUser.getLoggedInUser();
  th.title= title
  this.forumapi.createThread(th).subscribe()

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
}
