import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './keyboard/key/key.component';
import { GraphNodeComponent } from './graph-node/graph-node.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketComponent } from './graph-node/socket/socket.component';
import { GraphInputComponent } from './graph-node/graph-input/graph-input.component';
import { GraphOutputComponent } from './graph-node/graph-output/graph-output.component';
import { GraphConnectionComponent } from './graph-node/graph-connection/graph-connection.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyComponent,
    GraphNodeComponent,
    SocketComponent,
    GraphInputComponent,
    GraphOutputComponent,
    GraphConnectionComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
