import { Component, OnInit } from '@angular/core';
import { ContactInbox } from './inbox.model';
import { InboxService } from './inbox.service';

@Component({
  selector: 'ihb-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private inboxService: InboxService
  ) { }

  inbox: ContactInbox[] = [];
  limit = 10;
  page = 1;
  count: number;

  ngOnInit(): void {
    this.fetchCurrentPage();
  }

  fetchCurrentPage() {
    this.inboxService.get(this.page).subscribe(value => {
      this.inbox = value.contacts;
      this.count = value.count;
    })
  }

  delete(inboxMessage: ContactInbox) {
    this.inboxService.delete(inboxMessage.id).subscribe(() => {
      this.count--;
      this.fetchCurrentPage();
    })
  }
}
