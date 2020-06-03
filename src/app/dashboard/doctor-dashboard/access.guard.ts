import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../helper/url-serializer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private httpClient: HttpClient,
    private urlSerializer: UrlSerializerService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId = route.params.id;
    const url = this.urlSerializer.serialize(['doctor', userId, 'has-access']);
    return this.httpClient.get<Promise<boolean>>(url).pipe(map(res => {
      if (res) {
        return true;
      }
      return this.router.createUrlTree(['dashboard', 'doctor']);
    }));
  }
}
