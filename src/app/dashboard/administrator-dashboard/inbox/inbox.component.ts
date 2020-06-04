import { Component, OnInit } from '@angular/core';
import { ContactInbox, ContactInboxList } from './inbox.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { InboxService } from './inbox.service';

@Component({
  selector: 'ihb-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private inboxService: InboxService,
    private httpClient: HttpClient
  ) { }

  inbox: ContactInbox[] = [];
  limit = 10;
  page = 1;
  count: number;

  ngOnInit(): void {
    this.fetchCurrentPage();
  }

  fetchCurrentPage() {
    forkJoin({
      inboxList: this.httpClient.get<ContactInboxList>('contact/' + this.page),
    }).subscribe(response => {
      this.inbox = response.inboxList.contacts;
      this.count = response.inboxList.count;
    });
  }

  read(inboxMessage: ContactInbox) {

  }

  delete(inboxMessage: ContactInbox) {
    this.httpClient.delete('contact/' + inboxMessage.id).subscribe(() => {
      this.count--;
      this.fetchCurrentPage();
    })
  }
}
