import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { UserList } from './users.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(page: number, doctor: boolean, administrator: boolean) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('doctor', doctor.toString());
    params = params.append('administrator', administrator.toString());
    const url = this.urlSerializer.serialize(['administrator', 'users']);
    return this.httpClient.get<UserList>(url, { params });
  }


}
