import { Component, OnInit} from '@angular/core';
import { BeatyLoggerServiceService } from '../beaty/beaty-logger-service.service';


@Component({
  selector: 'main-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  value: number = 0;

  constructor(
    
    private beatyLog: BeatyLoggerServiceService
  ) {}

  ngOnInit() {
    
  }

  decHandler() {
    this.beatyLog.log('Warn', 'dec success');
  }
}
