import { Component, OnInit} from '@angular/core';
import { ServiceData } from '../service.service';


@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  value: number = 0;

  constructor(private serviceData: ServiceData) {}

  ngOnInit() {
    this.value = this.serviceData.value;
  }

  decHandler() {
    this.serviceData.dec();
  }
}
