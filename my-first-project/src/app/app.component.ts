import { Component } from '@angular/core';

export interface IObject {
  name:string
  age:number
  address?:string
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'hello';
  object: IObject = {
    name:'vlad',
    age:25,
  }
}
