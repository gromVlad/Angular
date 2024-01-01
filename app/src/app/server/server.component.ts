import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isOnline:number = 0
  isArray = [0.5,0.6,0.8]


  constructor(){
    this.isOnline = Math.random() 
  }

  pushArray(){
     this.isArray.push(Math.random());
  }
}
