import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'ihb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ])
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }
}
