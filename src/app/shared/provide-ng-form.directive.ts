import { Directive } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form[formGroup]',
  providers: [
    { provide: NgForm, useExisting: FormGroupDirective },
  ]
})
export class ProvideNgFormDirective { }
