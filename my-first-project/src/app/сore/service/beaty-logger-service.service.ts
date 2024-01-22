import { Injectable } from '@angular/core';
import { LogLevel } from '../module/typeBeatyLog';

@Injectable({
  providedIn: 'root'
})
export class BeatyLoggerServiceService {
  log(level: LogLevel, msg: string): void {
      switch (level) {
        case 'None':
          return console.log(msg);
        case 'Info':
          return console.info('%c' + msg, 'color: #6495ED');
        case 'Warn':
          return console.warn('%c' + msg, 'color: #FF8C00');
        case 'Error':
          return console.error('%c' + msg, 'color: #DC143C');
        default:
          console.debug(msg);
      }
  }
}
  

