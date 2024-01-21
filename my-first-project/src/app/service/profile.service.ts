import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from '../beaty/beaty-logger-service.service';

export interface Profile {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: {
    small: string | null;
    large: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiSocial}/profile`;
  private options = {
    withCredentials: true,
    headers: {
      'api-key': `${environment.apiKey}`,
    },
  };

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) {}

  getProfile(id:number): Observable<Profile> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`, this.options)
  }
}
