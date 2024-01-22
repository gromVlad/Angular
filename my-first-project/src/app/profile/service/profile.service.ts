import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from '../../сore/service/beaty-logger-service.service';
import { Profile } from '../module/interfaceProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiSocial}/profile`;

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) {}

  getProfile(id:number): Observable<Profile> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
  }
}
