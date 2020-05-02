import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'trailer-youtube',
  templateUrl: './trailer-youtube.component.html',
  styleUrls: ['./trailer-youtube.component.scss']
})
export class TrailerYoutubeComponent implements OnInit {
  @Input() trailer: any;
  @Input() filmeHeader:any;

  @Output() valueTrailer = new EventEmitter()
  constructor() { }
  onTrailer() {
    this.trailer = !this.trailer
    this.valueTrailer.emit({trailer:this.trailer})
  }
  ngOnInit(): void {
  }

}
