import { Component, OnInit } from '@angular/core';
import { ServiceData } from './service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value$ = new Observable();

  constructor(private serviceData: ServiceData) {}
  ngOnInit() {
    this.value$ = this. serviceData.value$
  }

  addHandler() {
    this.serviceData.add();
  }
}
