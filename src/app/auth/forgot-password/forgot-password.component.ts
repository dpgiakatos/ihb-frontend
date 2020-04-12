import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ihb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }

  validator(form: FormControl) {
    if (form.invalid && (form.dirty || form.touched)) {
      return true;
    }
    return false;
  }

  isValid(form: FormGroup): boolean {
    if (form.valid) {
      return false;
    }
    return true;
  }
}
