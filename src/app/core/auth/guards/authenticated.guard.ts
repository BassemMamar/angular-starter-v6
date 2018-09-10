import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LoggerService } from '../../base/logger/logger.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private logger: LoggerService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkLoggedIn(next.data.authClient, state.url);
  }

  // ToDo chaek later
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    //  return true;
    return this.checkLoggedIn(next.data.authClient, state.url);
  }

  private checkLoggedIn(authClient: string, redirectUrl: string): Observable<boolean> | boolean {

    if (this.authService.loggedIn) {
      return true;
    } else {
      this.authService.login(redirectUrl);
      return false;
    }

  }
}
