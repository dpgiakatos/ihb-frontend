import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const token = route.params.tokenId;
    return this.authService.checkResetToken(token).pipe(map(() => true), catchError(
      () => {
        this.router.navigate(['404'], { skipLocationChange: true }).then(() => {
          this.location.replaceState(state.url);
        });
        return of(false);
      }
    ));
  }

}
