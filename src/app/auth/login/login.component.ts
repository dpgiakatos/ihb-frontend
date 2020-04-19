import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ihb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }

  validator(form: FormControl): boolean {
    if (form.invalid && form.dirty && form.touched) {
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
