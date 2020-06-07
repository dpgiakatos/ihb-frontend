import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ihb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ])
    });
  }

  onSubmit() {
    this.authService.forgotPassword(this.form.value).subscribe(() => {
    }, (err: HttpErrorResponse) => {
      if (err.status === 404) {
        this.form.setErrors({ invalidCredentials: true });
      }
    });
    this.form.reset();
  }
}
