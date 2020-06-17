import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlSerializerService } from '../../../../helper/url-serializer.service';
import { UserTab } from '../users.model';
import { Role } from '../../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(id: string) {
    const url = this.urlSerializer.serialize(['administrator', id, 'tab']);
    return this.httpClient.get<UserTab>(url);
  }

  set(id: string, role: Role) {
    const url = this.urlSerializer.serialize(['administrator', id, 'set-role']);
    return this.httpClient.put<void>(url, null, { params: { role } });
  }

  deleteRole(id: string, role: Role) {
    const url = this.urlSerializer.serialize(['administrator', id, 'delete-role']);
    let params = new HttpParams();
    params = params.append('role', role);
    return this.httpClient.delete<void>(url, { params });
  }

  deleteUser(id: string) {
    const url = this.urlSerializer.serialize(['administrator', id, 'delete']);
    return this.httpClient.delete<void>(url);
  }

  hasApplication(id: string) {
    const url = this.urlSerializer.serialize(['application', id, 'hasApplication']);
    return this.httpClient.get<boolean>(url);
  }

  downloadDocument(id: string) {
    const url = this.urlSerializer.serialize(['application', id, 'download']);
    return this.httpClient.get(url, { responseType: 'blob', reportProgress: true, observe: 'events' });
  }

  deleteApplication(id: string) {
    const url = this.urlSerializer.serialize(['application', id, 'delete']);
    return this.httpClient.delete<void>(url);
  }
}
