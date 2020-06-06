import { Injectable } from '@angular/core';
import { UrlSerializerService } from 'src/app/helper/url-serializer.service';
import { HttpClient } from '@angular/common/http';
import { ContactInbox } from '../inbox.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(id: number) {
    const url = this.urlSerializer.serialize(['contact/message', id.toString()]);
    return this.httpClient.get<ContactInbox>(url);
  }

  delete(id: number) {
    const url = this.urlSerializer.serialize(['contact', id.toString()]);
    return this.httpClient.delete(url);
  }
}
