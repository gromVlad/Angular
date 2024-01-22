import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  ProfileService } from '../service/profile.service';
import { Profile } from '../module/interfaceProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<Profile>;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private routes:Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profile$ = this.profileService.getProfile(+id);
    }
  }

  backToUser() {
    this.routes.navigate(['users']);
  }
}
