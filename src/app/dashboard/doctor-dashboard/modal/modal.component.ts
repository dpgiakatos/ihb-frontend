import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { User } from '../doctor-dashboard.interface';

@Component({
  selector: 'ihb-modal-content',
  templateUrl: './modal.component.html'
})
export class ModalContentComponent {
  @Input() user: User;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private urlSerializer: UrlSerializerService,
    private httpClient: HttpClient
  ) {}

  entry() {
    const url = this.urlSerializer.serialize(['doctor', this.user.userId, 'access']);
    this.httpClient.get(url).subscribe();
    this.activeModal.close();
  }
}
