import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from '../../сore/service/beaty-logger-service.service';

export interface User {
  id: number;
  name: string;
  status?: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  followed: boolean;
}

interface Response {
  items: User[];
  totalCount?: number;
  error?: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiSocial}/users`;

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) {}

  getUsers(page:number): Observable<User[]> {
    return this.http
      .get<Response>(`${this.apiUrl}?page = ${page}`)
      .pipe(map((res) => res.items));
  }
}
