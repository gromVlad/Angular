import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading:boolean = true
  nestedValue: string= 'hello'

  constructor (){
    setTimeout(() => {
      this.isLoading = false
    }, 5000);
  }
}
