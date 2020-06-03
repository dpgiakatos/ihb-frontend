import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface Password {
  oldPassword: string;
  password: string;
  newPassword: string;
}

@Component({
  selector: 'ihb-settings-dashboard',
  templateUrl: './settings-dashboard.component.html',
  styleUrls: ['./settings-dashboard.component.css']
})
export class SettingsDashboardComponent implements OnInit {

  passwordForm: FormGroup;
  uploadForm: FormGroup;
  userId: string;


  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private jwt: JwtHelperService
  ) {
    this.userId = this.activatedRoute.snapshot.params.id;
    const accessToken = localStorage.getItem('access-token');
    if (!this.userId && accessToken) {
      this.userId = jwt.decodeToken(accessToken).id;
    }
  }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      newPassword: new FormControl(null, [
        Validators.required
      ])
    });
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [
        Validators.required
      ])
    });

    let params = new HttpParams();
    params = params.append('userId', this.userId);
  }

  onPasswordSubmit() {
    console.log(this.passwordForm.value);
    
    this.httpClient.put<Password>('user/' + this.userId + '/change-password', this.passwordForm.value).subscribe(
      (password: Password) => {
        this.passwordForm.reset();
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          console.log('network error');
        }
        if (err.status === 401) {
          this.passwordForm.setErrors({ invalidCredentials: true });
        }
      });
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
