import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInbox } from './inbox.model';
import { UrlSerializer } from '@angular/router';

@Injectable()
export class InboxService {

  constructor(
    private httpClient: HttpClient,
    private urlSerializer: UrlSerializer
  ) { }

  get(page: number) {
    return this.httpClient.get<ContactInbox>('contact', { params: { page: page.toString() } });
  }
}
