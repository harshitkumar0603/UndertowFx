import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Amazons3ServiceService } from '../amazons3-service.service';
import { Track, TrackDets} from '../track';
import {TracksComponent} from '../tracks/tracks.component';
import {TimerComponent} from '../timer/timer.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  constructor(private awss3Service: Amazons3ServiceService,  private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef) { }
  public tracks: Track[] = [];
  public play = false;
  public trackDets: Map<String, TrackDets> = new Map();
  public row = 0;
  trackDuration = 100;
  trackCurrentDuration: number = 0;

  @ViewChild(TracksComponent) trackComponent;
  @ViewChild(TimerComponent) timerComponent;
  ngOnInit(): void {
     var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
     this.awss3Service.getObjects().then( (tracks) => {
         this.tracks = tracks;
         this.tracks.splice(0,1)
         console.log('Tracks from S3' + this.tracks);
     })

    this.awss3Service.getTrackDetails().then( (trackDets: TrackDets[]) => {
      trackDets.forEach( (track) => {
        this.trackDets.set(track.Title, track)
      })
      console.log('Track Details' + this.trackDets);
    })

    this.renderer.listen('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
        // add logic
        navbar.classList.remove('navbar-transparent');
      } else {
        // remove logic
        navbar.classList.add('navbar-transparent');
      }
    });
  }

  stopTrack() {
    this.trackComponent.sound.stop();
    this.play = false;
  }

  pauseTrack() {
    if(!this.trackComponent.sound){
      this.trackComponent.playTrack('https://undertowfx.s3-eu-west-1.amazonaws.com/'+this.tracks[0].Key, 0)
      this.play = true;
      return;
    }
    if (this.trackComponent.sound.playing()) {
      this.trackComponent.sound.pause();
      this.play = this.trackComponent.sound.playing();
      return this.play;
    } else {
      this.trackComponent.sound.play();
      this.play = this.trackComponent.sound.playing();
      return this.play;
    }
  }

  nextTrack() {
    if(this.trackComponent.sound){
      this.trackComponent.playTrack('https://undertowfx.s3-eu-west-1.amazonaws.com/'+this.tracks[this.row + 1].Key, this.row + 1)
      this.play = true;
      return;
    }
  }

  getDuration() {
    if(this.trackComponent) {
      if (this.trackComponent.sound != null) {
        this.timerComponent.start();
        this.trackDuration = this.trackComponent.sound.duration(this.trackComponent.sound.id)
        return this.trackDuration;
      }
    }
  }

  seekTrack(value){
    this.trackComponent.sound.pause();
    console.log(value);
    this.trackComponent.sound.seek([value]);
    this.trackComponent.sound.play();
  }

  getSeekDuration(){
    if(this.trackComponent) {
      if (this.trackComponent.sound != null) {
        this.trackCurrentDuration = this.trackComponent.sound.seek(this.trackComponent.sound.id);
      }
    }
    return Math.floor(this.trackCurrentDuration);
  }

  likeTrack(index: number){
    console.log(index);
    var title = this.tracks[index].Key.split('/')[1].split('.')[0];
    this.awss3Service.updateTrackLikes(this.trackDets.get(title).Title);
    this.trackDets.get(title).Likes = this.trackDets.get(title).Likes + 1
  }

  updateIndex(index: number){
    this.row = index;
    this.play = true;
  }

}
