import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../../../helper/url-serializer.service';
import { UserTab } from '../users.model';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(id: string) {
    const url = this.urlSerializer.serialize(['administrator', id, 'tab']);
    return this.httpClient.get<UserTab>(url);
  }
}
