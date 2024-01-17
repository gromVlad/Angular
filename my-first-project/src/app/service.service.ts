import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceData {

  value:number = 5

  add(){
    this.value = this.value + 1
  }

  dec(){
    this.value = this.value - 1
  }
}
