import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ihb-settings-dashboard',
  templateUrl: './settings-dashboard.component.html',
  styleUrls: ['./settings-dashboard.component.css']
})
export class SettingsDashboardComponent implements OnInit {

  passwordForm: FormGroup;
  uploadForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required
      ]),
      retype: new FormControl(null, [
        Validators.required
      ])
    });
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onPasswordSubmit() {
    console.log(this.passwordForm.value);
    this.passwordForm.reset();
  }

  isNotSamePassword(): boolean {
    return Boolean(
      this.passwordForm.get('password')?.value !== this.passwordForm.get('retype')?.value && this.passwordForm.get('retype')?.touched
    );
  }

  onUploadSubmit() {

  }

  isInvalid(form: FormGroup): boolean {
    return form.invalid || this.isNotSamePassword();
  }
}
