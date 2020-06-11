import { Component, OnInit } from '@angular/core';
import * as gifshot from 'gifshot';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ForumServicesService } from '../services/forum-services.service';
import { Thread } from '../models/thread';
import { Subreddits } from '../models/subreddits';
import { UserApiService } from '../services/user-api.service';
import { emojiService } from '../services/emoji.service';
import { Emoji } from '../models/emoji';
import { DomSanitizer } from '@angular/platform-browser';


const URLs = 'http://localhost:1337/api/upload';
class ImageFile {
  file: File;
  uploadProgress: string;
}
@Component({
  selector: 'app-my-emoji',
  templateUrl: './my-emoji.component.html',
  styleUrls: ['./my-emoji.component.css']
})
export class MyEmojiComponent implements OnInit {
  private firas: string;
  image;
  gifimage;
  fileToUpload: File = null;
  fileData: File = null;
  previewUrl:any = null;
  avatarUrl;
  uploader;
  urlimage;
  emojimages:any []=[];
  fileUrl;
  imagesbase:Emoji[] = [];

/*
  public uploader: FileUploader = new FileUploader({
    url: URLs,
    itemAlias: 'image'
  });
*/
 // constructor(private toastr: ToastrService) { }
 emoji=new Emoji
  constructor(   private forumapi : ForumServicesService, private apiUser: UserApiService,private emojiservice: emojiService,private sanitizer: DomSanitizer) { }
  ngOnInit() {

  
    this.emojiservice.getimagebyuser(this.apiUser.getLoggedInUser().id_user).subscribe(response => {
      //this.images.push( response);
this.imagesbase=response;
for (let i = 0; i < this.imagesbase.length; i++) {
  this.emojimages.push(this.imagesbase[i].urlimage);
 
}
//console.log(this.emojimages);

    
    })
  /*  this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
   
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //this.toastr.success('File successfully uploaded!');
    };*/
  }
  addgif(){

      gifshot.createGIF({  gifWidth: 200,
        gifHeight: 200,
        interval: 0.8,
        numFrames: 10,
        frameDuration: 1,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontColor: '#ffffff',
        textAlign: 'center',
        textBaseline: 'bottom',
        sampleInterval: 10,
        numWorkers: 2 }, (obj) => {
        if (obj.error) return;
        this.uploader = obj.image;
      console.log(obj);
      });
      


    
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

 makeRandom(lengthOfCode: number, possible: string) {
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
}
telecharger()
{console.log(this.uploader);
  var reader = new FileReader();      
reader.readAsDataURL(this.uploader); 
reader.onload = (_event) => { 
  this.fileUrl = reader.result; 
}
console.log(this.uploader);
console.log(this.fileUrl);
  let byteCharacters = atob(this.uploader)
  let byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  var byteArray = new Uint8Array(byteNumbers);
  
  let blob = new Blob([byteArray], {"type": "image/jpeg"});
    
      if(navigator.msSaveBlob){
        let filename = 'fichier';
        navigator.msSaveBlob(blob, filename);
      } else {
        let link = document.createElement("a");
  
        link.href = URL.createObjectURL(blob);
  
        link.setAttribute('visibility','hidden');
        link.download = 'fichier';
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const lengthOfCode = 40;
 let random=this.makeRandom(lengthOfCode, possible)
  let currentUser = this.apiUser.getLoggedInUser();
    this.emoji.iduser =currentUser.id_user;
    this.emoji.urlimage=random;
   // console.log(this.avatarUrl);
      this.emojiservice.ajoutimage(this.emoji).subscribe(response => {
        console.log(this.emoji);
       
      })
  this.image= this.apiUser.getLoggedInUser().id_user;
    const formData = new FormData();  
    formData.append('file', this.uploader,random +'.gif');
    this.emojiservice.uploadimageemoji(formData).subscribe(resp => {
      
      this.avatarUrl = "http://localhost:1337/emoji/"+random +".gif?";
    })
    
  this.ngOnInit()
    
    
}

  addimage(){
  
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
   let random=this.makeRandom(lengthOfCode, possible)
    let currentUser = this.apiUser.getLoggedInUser();
      this.emoji.iduser =currentUser.id_user;
      this.emoji.urlimage=random;
      console.log(this.avatarUrl);
        this.emojiservice.ajoutimage(this.emoji).subscribe(response => {
          console.log(this.emoji);
         
        })
    this.image= this.apiUser.getLoggedInUser().id_user;
      const formData = new FormData();  
      formData.append('file', this.fileData,random +'.gif');
      this.emojiservice.uploadimageemoji(formData).subscribe(resp => {
        
        this.avatarUrl = "http://localhost:1337/emoji/"+random +".gif?";
      })
      
    this.ngOnInit()
      
      
    
  }

}
