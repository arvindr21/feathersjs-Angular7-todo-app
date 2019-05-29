import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresLogin = route.data.requiresLogin || false;
    const path = route.routeConfig.path;
    const isAuthenticated = this.auth.isAuthenticated();
    if (!requiresLogin) {
      if (isAuthenticated) {
        this.router.navigate(['home']);
      }
      return true;
    }
    if (!isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
