import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

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
    retype: new FormControl(null, [Validators.required])
  });
  uploadForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });
  userId: string;

  file: File;
  applicationActive: boolean;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    jwt: JwtHelperService
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
    this.hasApplication();
  }

  onPasswordSubmit() {
    this.httpClient.put<Password>('user/' + this.userId + '/change-password', this.passwordForm.value).subscribe(
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

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        if ((/\.(zip)$/i).test(file.name) && file.size <= 50000000) {
          this.file = file;
        } else {
          // TODO: handle error
        }
      }
    }
  }

  onUploadSubmit() {
    this.settingsService.post(this.file).subscribe(() => { this.hasApplication(); });
  }

  hasApplication() {
    this.settingsService.get().subscribe(value => { this.applicationActive = value; });
  }

  isInvalid(form: FormGroup): boolean {
    return form.invalid || this.isNotSamePassword();
  }

}
