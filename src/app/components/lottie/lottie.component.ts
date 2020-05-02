import { Component, Input, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.scss']
})
export class LottieComponent {
  @Input() value: any;
  @Input() class: any;
  options;

  animationCreated(animationItem: AnimationItem): void {
  }
  ngOnInit() {

    this.options = {
      path: `../../../assets/${this.value}`,
    };
  }
}