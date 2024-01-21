import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile, ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<Profile>

  constructor(private route: ActivatedRoute,private profileService:ProfileService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id ){
      this.profile$ = this.profileService.getProfile(+id);
    }
  }
}
