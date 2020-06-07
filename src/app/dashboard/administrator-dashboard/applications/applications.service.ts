import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { ApplicationList } from './applications.model';

@Injectable()
export class ApplicationsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    const url = this.urlSerializer.serialize(['application', 'get-all']);
    return this.httpClient.get<ApplicationList>(url, { params });
  }
}
