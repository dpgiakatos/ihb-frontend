import { Directive, OnInit, ElementRef, Renderer2, EventEmitter, OnDestroy, HostListener, Optional } from '@angular/core';
import { NgControl, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlValidationStateDirective implements OnInit, OnDestroy {

  private submitListener: Subscription;
  private validationListener: Subscription;

  private control: FormControl;

  constructor(private controlRef: NgControl, private form: NgForm, private ref: ElementRef, private renderer2: Renderer2) { }

  ngOnInit(): void {
    if (this.controlRef.control) {
      this.control = this.controlRef.control as FormControl;
    }

    this.submitListener = this.form.ngSubmit.subscribe(() => {
      this.control.markAsDirty();
      this.control.markAsTouched();
      this.checkValidationStatusAndMessage();
    });


    this.validationListener = this.control.statusChanges.subscribe(() => {
      this.checkValidationStatusAndMessage();
    });
  }

  ngOnDestroy() {
    this.submitListener.unsubscribe();
    this.validationListener.unsubscribe();
  }

  private checkValidationStatusAndMessage() {
    if (this.control.invalid && this.control.dirty && this.control.touched) {
      this.renderer2.addClass(this.ref.nativeElement, 'is-invalid');
      return;
    }
    this.renderer2.removeClass(this.ref.nativeElement, 'is-invalid');
  }

  @HostListener('blur')
  private onInputBlur() {
    this.checkValidationStatusAndMessage();
  }

}
