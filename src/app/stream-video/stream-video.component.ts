import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import FlvJs from 'flv.js';
import { StreamkeyApiService } from '../services/streamkey-api.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent implements OnInit {

  userId;
  user;

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
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
        const videoElement =  <HTMLAudioElement>document.getElementById('videoElement');
        const flvPlayer = FlvJs.createPlayer({
          type: 'flv',
          url: 'http://51.178.25.45:1338/live/'+response["streamKey"]+'.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    })
  }

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
}
