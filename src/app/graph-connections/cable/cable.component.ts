import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-cable]',
  templateUrl: './cable.component.html',
  styleUrls: ['./cable.component.scss']
})
export class CableComponent implements OnInit {
  @Input() startPos: { x: 0, y: 0 };

  @Input() endPos: { x: 0, y: 0 };

  elasticity = 0.9;

  get qPos() {
    const { x: sX, y: sY } = this.startPos;
    const { x: eX, y: eY } = this.endPos;

    const length = Math.sqrt((sX - eX) ** 2 + (sY - eY) ** 2);

    const sag = length * this.elasticity;

    const center = {
      x: (sX + eX) / 2,
      y: (sY + eY) / 2
    };

    return { x: center.x, y: center.y + sag };
  }

  get pathString() {
    const { x: sX, y: sY } = this.startPos;
    const { x: eX, y: eY } = this.endPos;
    const { x: qX, y: qY } = this.qPos;

    return `M${sX} ${sY} Q ${qX} ${qY} ${eX} ${eY}`;
  }

  viewBox: string;
  constructor() { }

  ngOnInit() {
  }

}
