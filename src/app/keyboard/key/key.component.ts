import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass']
})
export class KeyComponent implements OnInit {
  @Input() note: number;

  /**
   * Default piano key type
   */
  get keyClass() {
    const blackNotes = [2, 5, 7, 10, 12];
    const leftNotchNotes = [3, 8];
    const rightNotchNotes = [4, 9];
    const bothNotchNotes = [1, 6, 11];

    const baseNote = this.note % 13 + 1;

    return baseNote in blackNotes ? 'black' : 'white';

    if (baseNote in blackNotes) {
      return 'black';
    }
    if (baseNote in leftNotchNotes) {
      return 'leftNotch';
    }
    if (baseNote in rightNotchNotes) {
      return 'rightNotch';
    }
    if (baseNote in bothNotchNotes) {
      return 'bothNotch';
    }
  }

  constructor() { }

  ngOnInit() {
    console.log(this.note % 13, this.keyClass);
  }

}
