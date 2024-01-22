import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BeatyLoggerServiceService } from './beaty-logger-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthMeResponse, ResultCode } from '../module/interfaceAuth';

@Injectable()
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
