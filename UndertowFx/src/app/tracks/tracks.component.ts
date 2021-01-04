import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Track, TrackDets} from '../track';
import {Howl} from 'howler';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  constructor() { }
  @Input() songs: Track[];
  @Input() trackDetails: Map<String,TrackDets>;
  @Output() index = new EventEmitter<number>();

  public sound;
  ngOnInit(): void {
  }

  playTrack(songUrl: string, index: number) {
    if (this.sound && this.sound.playing()) {
      this.sound.stop();
    }
    this.sound = new Howl({
      src: [songUrl],
      html5 : true
    });

    this.sound.play();
    this.trackInfo(index)
  }

  stopTrack() {
    // this.myEvent.emit(this.sound);
  }

  trackInfo(index: number){
    this.index.emit(index)
  }

}
