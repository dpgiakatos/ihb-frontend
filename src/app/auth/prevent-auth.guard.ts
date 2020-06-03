import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree(['dashboard']);
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigateByUrl('/dashboard');
    return false;
  }

}
