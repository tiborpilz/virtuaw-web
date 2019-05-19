import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import { Welcome, Button } from '@storybook/angular/demo';

import { KeyboardComponent } from '../app/keyboard/keyboard.component';

const stories = storiesOf('DigitalInstruments', module);
stories.addDecorator(withKnobs);

stories.add('Piano', () => ({
  component: KeyboardComponent,
  props: {
    startNote: number('Start MIDI note', 24),
    endNote: number('End MIDI note', 108)
  },
}));
