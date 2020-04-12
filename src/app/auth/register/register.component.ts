import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ihb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fName': new FormControl(null, [
        Validators.required
      ]),
      'lName': new FormControl(null, [
        Validators.required
      ]),
      'email': new FormControl(null, [
        Validators.required
      ]),
      'password': new FormControl(null, [
        Validators.required
      ]),
      'cPassword': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {

  }

  validator(form: FormControl) {
    if (form.invalid && (form.dirty || form.touched)) {
      return true;
    }
    return false;
  }

  isValid(form: FormGroup): boolean {
    if (form.valid && !this.checkSamePassword()) {
      return false;
    }
    return true;
  }

  checkSamePassword(): boolean {
    if (this.form.get('password').value !== this.form.get('cPassword').value) {
      return true;
    }
    return false;
  }
}
