import { Component, OnInit } from '@angular/core';
import * as gifshot from 'gifshot';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';


const URL = 'http://localhost:1337/api/upload';
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








  
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

 // constructor(private toastr: ToastrService) { }
  constructor() { }
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
   
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //this.toastr.success('File successfully uploaded!');
    };
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
        this.firas = obj.image;
      });
    
  }

}
