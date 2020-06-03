import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from './personal.model';
import { UrlSerializerService } from 'src/app/helper/url-serializer.service';

@Injectable()
export class PersonalInformationService {
  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'personal-information']);
    return this.httpClient.get<Personal>(url);
  }

  edit(personal: Personal) {
    return this.httpClient.put<void>('user/personal-information', personal);
  }
}
