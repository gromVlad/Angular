import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  arr:string[]= []

  sendvalue (value:string){
    this.arr.push(value);
  }
}
