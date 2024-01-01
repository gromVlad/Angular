import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  isclick:boolean = true

  constructor (){
    setTimeout(() => {
      this.isclick = false
    }, 3000);
  }
}
