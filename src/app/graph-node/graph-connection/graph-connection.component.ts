import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-connection',
  templateUrl: './graph-connection.component.html',
  styleUrls: ['./graph-connection.component.scss']
})
export class GraphConnectionComponent implements OnInit {
  @Input() connection;
  constructor(
  ) { }

  ngOnInit() {
  }

}
