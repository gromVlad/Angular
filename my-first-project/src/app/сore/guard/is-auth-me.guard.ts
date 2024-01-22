import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AutmMeService } from '../service/authMe.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private autmMeService:AutmMeService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return  this.autmMeService.isAuth
  }

}
