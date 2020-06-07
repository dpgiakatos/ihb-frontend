import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = route.params.tokenId;
    return this.authService.checkResetToken(token).pipe(map(() => true), catchError(
      () => of(this.router.createUrlTree(['auth', 'forgot-password']))
    ));
  }

}
