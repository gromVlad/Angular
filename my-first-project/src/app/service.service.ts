import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceData {

  value$:BehaviorSubject<number> = new BehaviorSubject<number>(5)

  add(){
    this.value$.next(this.value$.getValue() + 1)
  }

  dec(){
    this.value$.next(this.value$.getValue() - 1);
  }
}
