import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInboxList } from './inbox.model';
import { UrlSerializerService } from 'src/app/helper/url-serializer.service';

@Injectable()
export class InboxService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(page: number) {
    const url = this.urlSerializer.serialize(['contact', page.toString()]);
    return this.httpClient.get<ContactInboxList>(url);
  }

  delete(id: string) {
    const url = this.urlSerializer.serialize(['contact', id]);
    return this.httpClient.delete(url);
  }
}
