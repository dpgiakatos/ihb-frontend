import { Injectable } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UrlSerializerService {
  constructor(private router: Router, private urlSerializer: UrlSerializer) { }

  serialize(urlSegments: (string | undefined)[]) {
    return this.urlSerializer.serialize(
      this.router.createUrlTree(urlSegments.filter(x => x))
    ).substring(1);
  }
}
