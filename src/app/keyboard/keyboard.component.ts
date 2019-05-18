import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  /**
   * Trigger function
   */
  @Input() onTrigger;
  /**
   * MIDI value of start note, default is 36 (C2)
   */
  startNote = 36;
  /**
   * MIDI value of end note, default is 36 (C5)
   */
  endNote = 72;
  /**
   * Array of 36 MIDI notes from start to end note (default C2 to C5)
   */
  get notes() {
    const { startNote, endNote } = this;
    const range = endNote - startNote;
    return Array.from(Array(range)).map((_, note) => note + startNote);
  }

  /**
   * Returns key type based on MIDI base note.
   */
  keyType(note) {
    const blackNotes = [1, 3, 6, 8, 10];
    return blackNotes.includes(note % 12) ? 'black' : 'white';
  }

  // onTrigger = (note, trigger) => console.log(note);

  constructor() { }

  ngOnInit() {
    console.log(this.notes);
  }

}
