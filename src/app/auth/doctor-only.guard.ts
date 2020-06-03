import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Role } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorOnlyGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getClaims()?.roles.some(r => r === Role.Doctor)) {
      return true;
    }
    return this.router.createUrlTree([]);
  }

}
