import { Component, OnInit } from '@angular/core';
import { AutmMeService } from './service/authMe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class App implements OnInit {
  constructor(private autmMeService: AutmMeService) {}

  ngOnInit(): void {
    this.autmMeService.getAuthMe()
  }
}


