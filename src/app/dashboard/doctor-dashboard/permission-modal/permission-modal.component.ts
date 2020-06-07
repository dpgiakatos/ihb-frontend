import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../doctor-dashboard.model';

@Component({
  selector: 'ihb-permission-modal',
  templateUrl: './permission-modal.component.html'
})
export class PermissionModalComponent {
  @Input() user: User;

  constructor(
    public activeModal: NgbActiveModal
  ) {}
}
