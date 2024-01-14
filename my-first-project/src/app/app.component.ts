import { Component } from '@angular/core';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputValue: string = '';
  inputNGModule: string = 'hello';

  onInputEvent(event: Event) {
    this.inputValue = (event.currentTarget as HTMLInputElement).value;
  }
}
