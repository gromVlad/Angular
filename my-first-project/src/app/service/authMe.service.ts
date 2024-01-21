import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from '../beaty/beaty-logger-service.service';

interface AuthMeResponse {
  resultCode: number;
  messages: string[];
  data: {
    id: number;
    email: string;
    login: string;
  };
}

enum ResultCode {
  success = 0,
  error = 1,
}

@Injectable({
  providedIn: 'root',
})
export class AutmMeService {
  private apiUrl = `${environment.apiSocial}/auth/me`;
  isAuth:boolean = false

  constructor(
    private http: HttpClient,
    private beatyLogger: BeatyLoggerServiceService
  ) {}

  getAuthMe(): void{
    this.http
      .get<AuthMeResponse>(this.apiUrl)
      .subscribe((res) =>
        res.resultCode === ResultCode.success
          ? (this.isAuth = true)
          : (this.isAuth = false)
      );
  }
}
