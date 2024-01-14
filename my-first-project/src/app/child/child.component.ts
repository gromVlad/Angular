import { Component, Input } from '@angular/core';
import { IObject } from '../app.component';

@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() title?: string;
  @Input() object?: IObject;
}
