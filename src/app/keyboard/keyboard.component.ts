import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  /**
   * MIDI value of start note, default is 36 (C2)
   */
  @Input() startNote = 24;
  /**
   * MIDI value of end note, default is 36 (C5)
   */
  @Input() endNote = 112;
  /**
   * Trigger function
   */
  @Input() onTrigger = (value, active) => null;
  /**
   * Array of 36 MIDI notes from start to end note (default C2 to C5)
   */
  get notes() {
    const { startNote, endNote } = this;
    const range = endNote - startNote;
    return Array.from(Array(range)).map((_, note) => note + startNote);
  }
  /**
   * Currently active notes
   */
  activeNotes = new Set();

  onMousedown(note, event) {
    this.trigger(note, true, event);
    event.preventDefault();
    event.stopPropagation();
  }

  onMouseleave(note, event) {
    this.trigger(note, false, event);
  }

  onMouseenter(note, event) {
    if (event.buttons === 1) {
      this.trigger(note, true, event);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.activeNotes.forEach(value => this.trigger(value, false, event));
  }
  /**
   * Event callback
   */
  trigger(value, active, event) {
    if (active) {
      this.onTrigger(value, active);
      this.activeNotes.add(value);
    } else {
      this.activeNotes.delete(value);
    }
  }


  /**
   * Returns key type based on MIDI base note.
   */
  keyType(note) {
    const blackNotes = [1, 3, 6, 8, 10];
    return blackNotes.includes(note % 12) ? 'black' : 'white';
  }

  classNames(note) {
    return this.keyType(note) + (this.activeNotes.has(note) ? ' active' : '');
  }

  constructor() { }

  ngOnInit() {
  }

}
