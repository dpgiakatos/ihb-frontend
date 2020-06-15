import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core';
import { ToastsService, Toast } from './toasts.service';

@Component({
  selector: 'ihb-toasts',
  templateUrl: './toasts.component.html'
})
export class ToastsComponent implements OnInit {

  @HostBinding('class.ngb-toasts') ngbToasts = true;

  constructor(public toastsService: ToastsService) { }

  ngOnInit(): void { }

  isTemplate(toast: Toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  getTemplate(toast: Toast) {
    if (toast.textOrTpl instanceof TemplateRef) {
      return toast.textOrTpl;
    }
    return null;
  }


}
