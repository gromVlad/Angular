import { Component } from '@angular/core';
import { IValues } from './child/child.component';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title:string = ''

  sendvalue (value:IValues){
    this.title = value.name
  }
}
