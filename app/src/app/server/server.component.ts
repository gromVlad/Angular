import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isOnline:string = 'online'

  constructor(){
    this.isOnline = Math.random() > 0.5 ? "online" : "offline"
  }

  setColor(){
    return this.isOnline === 'online' ? 'blue' : 'red' 
  }
}
