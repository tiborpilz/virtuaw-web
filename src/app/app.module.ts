import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './keyboard/key/key.component';
import { GraphNodeComponent } from './graph-node/graph-node.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyComponent,
    GraphNodeComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
