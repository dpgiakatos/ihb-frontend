import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../helper/url-serializer.service';

@Injectable()
export class SettingsService {
  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  post(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const url = this.urlSerializer.serialize(['application', 'upload']);
    return this.httpClient.post<any>(url, formData, {});
  }

  get() {
    const url = this.urlSerializer.serialize(['application', 'hasApplication']);
    return this.httpClient.get<boolean>(url);
  }
}
