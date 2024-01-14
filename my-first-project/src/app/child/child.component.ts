import { Component, EventEmitter, Output } from '@angular/core';

export interface IValues {
  age:string,
  name:string
}

@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() sendEventValue = new EventEmitter<IValues>();

  sendhandlervalue(){
    const myName = 'vlad'
    const myAge = 24
    this.sendEventValue.emit({ name: myName,age: myAge + ""});
  }
}
