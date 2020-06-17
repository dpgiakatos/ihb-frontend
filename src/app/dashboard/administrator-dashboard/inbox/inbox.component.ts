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

  offset = 0;

  showSpinner = true;

  ngOnInit(): void {
    this.fetchCurrentPage();
  }

  fetchCurrentPage() {
    this.showSpinner = true;
    this.inboxService.get(this.page).subscribe(value => {
      this.offset = (this.page - 1) * this.limit;
      this.inbox = value.contacts;
      this.count = value.count;
      this.showSpinner = false;
    });
  }

  delete(inboxMessage: ContactInbox) {
    this.inboxService.delete(inboxMessage.id).subscribe(() => {
      this.fetchCurrentPage();
    });
  }
}
