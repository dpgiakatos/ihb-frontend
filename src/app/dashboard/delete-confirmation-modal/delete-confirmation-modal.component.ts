import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ihb-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html'
})
export class DeleteConfirmationModalComponent {
  constructor(public activeModal: NgbActiveModal) { }
}
