import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Output() sendEventValue = new EventEmitter<string>();
  info:string = ''

  sendhandlervalue(){
    this.sendEventValue.emit(this.info);
    this.info = ''
  }
}
