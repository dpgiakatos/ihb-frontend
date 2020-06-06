import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

interface Password {
  password: string;
  newPassword: string;
}

@Component({
  selector: 'ihb-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  private passwordChange: Subscription;
  private confirmPasswordChange: Subscription;
  private userInitiatedChange = true;


  // constructor(
  //   private httpClient: HttpClient,
  //   private activatedRoute: ActivatedRoute,
  //   private jwt: JwtHelperService
  // ) {
  //   this.userId = this.activatedRoute.snapshot.params.id;
  //   const accessToken = localStorage.getItem('access-token');
  //   if (!this.userId && accessToken) {
  //     this.userId = jwt.decodeToken(accessToken).id;
  //   }
  // }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required
      ]),
      newPassword: new FormControl(null, [
        Validators.required
      ])
    });

    this.passwordChange = this.resetPasswordForm.controls.password.valueChanges.subscribe(() => this.checkSamePassword());
    this.confirmPasswordChange = this.resetPasswordForm.controls.newPassword.valueChanges.subscribe((event) => {
      if (this.userInitiatedChange) {
        this.checkSamePassword();
      }
    });

    // let params = new HttpParams();
    // params = params.append('userId', this.userId);
  }


  onResetPasswordSubmit() {
    console.log(this.resetPasswordForm.value);
    this.resetPasswordForm.reset();
  }

  checkSamePassword() {
    this.userInitiatedChange = false;
    const confirmPasswordControl = this.resetPasswordForm.get('newPassword') as FormControl;
    if (this.resetPasswordForm.get('password')?.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ invalidConfirmation: true });
    } else {
      confirmPasswordControl.updateValueAndValidity();
    }
    this.userInitiatedChange = true;

  }


  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }

}
