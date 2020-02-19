import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import FlvJs from 'flv.js';
@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    if (FlvJs.isSupported()) {
      const videoElement =    <HTMLAudioElement>document.getElementById('videoElement');
      const flvPlayer = FlvJs.createPlayer({
        type: 'flv',
        url: 'https://samercreations.xyz/stream/live/SAMER.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }

  }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  title = 'geeksoverflowpimangular';
 
}
