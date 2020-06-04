import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { UserList } from './users.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(search: string, page: number, doctor: boolean, administrator: boolean) {
    let url: string;
    let params = new HttpParams();
    if (search.length > 0) {
      url = this.urlSerializer.serialize(['administrator', 'search']);
      params = params.append('search', search);
    } else {
      url = this.urlSerializer.serialize(['administrator', 'users']);
    }
    params = params.append('page', page.toString());
    params = params.append('doctor', doctor.toString());
    params = params.append('administrator', administrator.toString());
    return this.httpClient.get<UserList>(url, { params });
  }
}
