import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDisabled:boolean = true

  constructor (){
    setTimeout(() => {
      this.isDisabled = false
    }, 5000);
  }
}
