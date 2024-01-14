import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'hello';
  url: string = 'https://www.npmjs.com/package/@angular/cli';
  date:Date = new Date()
}
