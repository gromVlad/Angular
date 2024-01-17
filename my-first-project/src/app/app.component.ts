import { Component, OnInit } from '@angular/core';
import { ServiceData } from './service.service';
import { Observable } from 'rxjs';
import { BeatyLoggerServiceService } from './beaty/beaty-logger-service.service';

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  value$ = new Observable();

  constructor(private serviceData: ServiceData,private beatyLog:BeatyLoggerServiceService) {}
  ngOnInit() {
    this.value$ = this. serviceData.value$
  }

  addHandler() {
    this.serviceData.add();
    this.beatyLog.log('Info','success');
  }
}
