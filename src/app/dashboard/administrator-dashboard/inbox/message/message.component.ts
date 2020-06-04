import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContactInbox } from '../inbox.model';

@Component({
  selector: 'ihb-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  inboxId: number;

  email = new FormControl();
  subject = new FormControl();
  message = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.inboxId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get<ContactInbox>('contact/new/' + this.inboxId).
    subscribe(value => {
      // console.log(value);
      this.email.setValue(value.email);
      this.subject.setValue(value.subject);
      this.message.setValue(value.message);
    });
  
  }

}
