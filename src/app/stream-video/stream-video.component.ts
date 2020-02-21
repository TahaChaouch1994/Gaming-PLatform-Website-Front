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
  avatarUrl;
  isStreaming: boolean = false;

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
        this.streamApi.getAllStreams(response["streamKey"]).subscribe(resp2 => {
          if (resp2["live"][response["streamKey"]] != undefined)
          {
            const videoElement =  <HTMLAudioElement>document.getElementById('videoElement');
            const flvPlayer = FlvJs.createPlayer({
              type: 'flv',
              url: 'http://51.178.25.45:1338/live/'+response["streamKey"]+'.flv'
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            this.isStreaming = true;
          }
        });
      }
    })
    this.avatarUrl = "http://51.178.25.45:1337/avatars/"+this.userId+".jpg?"+(new Date()).getTime();
  }

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
}
