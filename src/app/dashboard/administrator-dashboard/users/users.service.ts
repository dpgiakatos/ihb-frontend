import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserList } from './users.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  get(search: string, page: number, doctor: boolean, administrator: boolean) {
    let params = new HttpParams();
    if (search.length > 0) {
      params = params.append('search', search);
    }
    params = params.append('page', page.toString());
    params = params.append('doctor', doctor.toString());
    params = params.append('administrator', administrator.toString());
    return this.httpClient.get<UserList>('administrator/users', { params });
  }
}
