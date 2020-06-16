import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { minLength } from '../../helper/length.validator';
import { ToastsService } from 'src/app/toasts/toasts.service';
import { Subscription } from 'rxjs';

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

  @ViewChild('successToast') successToastTemplate: TemplateRef<{}>;

  private confirmPasswordChange: Subscription;
  private passwordChange: Subscription;
  private userInitiatedChange = true;

  constructor(
    private httpClient: HttpClient,
    private settingsService: SettingsService,
    private router: Router,
    private authService: AuthService,
    private toastsService: ToastsService
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

    this.passwordChange = this.passwordForm.controls.password.valueChanges.subscribe(() => this.checkSamePassword());
    this.confirmPasswordChange = this.passwordForm.controls.newPassword.valueChanges.subscribe(() => {
      if (this.userInitiatedChange) {
        this.checkSamePassword();
      }
    });
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.httpClient.put<Password>('user/change-password', this.passwordForm.value).subscribe(
      () => {
        this.toastsService.show(this.successToastTemplate, { className: 'bg-success text-light', delay: 10000 });
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

  checkSamePassword() {
    this.userInitiatedChange = false;
    const confirmPasswordControl = this.passwordForm.get('newPassword') as FormControl;
    if (this.passwordForm.get('password')?.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ invalidConfirmation: true });
    } else {
      confirmPasswordControl.updateValueAndValidity();
    }
    this.userInitiatedChange = true;
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
        if ((/\.(zip)$/i).test(file.name) && file.size <= 25000000) {
          this.uploadError = false;
          this.file = file;
        } else {
          this.uploadError = true;
          this.uploadForm.reset();
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
