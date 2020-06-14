import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { minLength } from '../../helper/length.validator';

interface Password {
  oldPassword: string;
  password: string;
  newPassword: string;
}

@Component({
  selector: 'ihb-settings-dashboard',
  templateUrl: './settings-dashboard.component.html',
  styleUrls: ['./settings-dashboard.component.css'],
  providers: [SettingsService]
})
export class SettingsDashboardComponent implements OnInit {

  passwordForm = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    retype : new FormControl(null, [Validators.required])
  });
  uploadForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });
  userId: string;

  file: File;
  applicationExist: boolean;
  uploadError = false;

  showSpinner = false;

  constructor(
    private httpClient: HttpClient,
    private settingsService: SettingsService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        minLength(8)
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
    this.hasApplication();
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.httpClient.put<Password>('user/change-password', this.passwordForm.value).subscribe(
      () => {
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

  get getOldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get getPassword() {
    return this.passwordForm.get('password');
  }

  get getNewPassword() {
    return this.passwordForm.get('newPassword');
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        if ((/\.(zip)$/i).test(file.name) && file.size <= 50000000) {
          this.file = file;
        }
      }
    }
  }

  onUploadSubmit() {
    this.showSpinner = true;
    this.settingsService.post(this.file).subscribe(() => {
      this.applicationExist = true;
      this.showSpinner = false;
      this.uploadError = false;
    }, () => {
      this.showSpinner = false;
      this.uploadError = true;
    });
  }

  hasApplication() {
    this.settingsService.get().subscribe(value => { this.applicationExist = value; });
  }

  onDelete() {
    this.httpClient.delete('user').subscribe(() => {
      this.authService.logout();
      this.router.navigateByUrl('');
    });
  }

}
