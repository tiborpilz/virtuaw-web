import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './keyboard/key/key.component';
import { GraphNodeComponent } from './graph-node/graph-node.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketComponent } from './graph-node/socket/socket.component';
import { GraphConnectionsComponent } from './graph-connections/graph-connections.component';
import { CableComponent } from './graph-connections/cable/cable.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyComponent,
    GraphNodeComponent,
    SocketComponent,
    GraphConnectionsComponent,
    CableComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
