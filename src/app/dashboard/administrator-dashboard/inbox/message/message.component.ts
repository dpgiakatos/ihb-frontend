import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './message.service';

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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.inboxId = this.activatedRoute.snapshot.params.id;
    this.messageService.get(this.inboxId).subscribe(value => {
      this.email.setValue(value.email);
      this.subject.setValue(value.subject);
      this.message.setValue(value.message);
    })
  }

  delete() {
    this.messageService.delete(this.inboxId).subscribe(() => {})
  }

}
