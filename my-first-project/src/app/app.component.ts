import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isError:boolean = false

  constructor (){
    setTimeout(() => {
      this.isError = true
    }, 3000);
  }
}
