import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings-dashboard',
  templateUrl: './settings-dashboard.component.html',
  styleUrls: ['./settings-dashboard.component.css']
})
export class SettingsDashboardComponent implements OnInit {

  passwordForm;
  uploadForm;

  constructor() { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      'password': new FormControl(null, [
        Validators.required
      ]),
      'retype': new FormControl(null, [
        Validators.required
      ])
    });
    this.uploadForm = new FormGroup({
      'file': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onPasswordSubmit() {
    console.log(this.passwordForm.value);
    this.passwordForm.reset();
  }

  checkSamePassword(): boolean {
    if (this.passwordForm.get('password').value !== this.passwordForm.get('retype').value) {
      return true;
    }
    return false;
  }

  onUploadSubmit() {

  }

  uploadButton() {
    if (this.uploadForm.valid) {
      return false;
    }
    return true;
  }

  isValid(form: FormGroup): boolean {
    if (form.valid && !this.checkSamePassword()) {
      return false;
    }
    return true;
  }
}
