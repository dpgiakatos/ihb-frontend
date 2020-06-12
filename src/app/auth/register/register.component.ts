import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UnprocessableEntitySchema } from 'src/app/helper/UnprocessableEntitySchema';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ihb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private confirmPasswordChange: Subscription;
  private passwordChange: Subscription;
  private userInitiatedChange = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      cPassword: new FormControl(null, [
        Validators.required
      ])
    });

    this.passwordChange = this.form.controls.password.valueChanges.subscribe(() => this.checkSamePassword());
    this.confirmPasswordChange = this.form.controls.cPassword.valueChanges.subscribe(() => {
      if (this.userInitiatedChange) {
        this.checkSamePassword();
      }
    });
  }

  ngOnDestroy() {
    this.passwordChange.unsubscribe();
    this.confirmPasswordChange.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.register(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/dashboard/user');
    }, (err: HttpErrorResponse) => {
      if (err.status === 422) {
        const validationErrors: UnprocessableEntitySchema = err.error;
        // tslint:disable-next-line: forin
        for (const forControl in validationErrors.failingConstraints) {
          const control = this.form.get(forControl);
          if (control) {
            const errors: {[key: string]: string; } = {};

            validationErrors.failingConstraints[forControl].forEach(validation => {
              errors[validation.constraint] = validation.message || 'true';
            });
            control.setErrors(errors);
          }
        }
      }
    });
  }

  checkSamePassword() {
    this.userInitiatedChange = false;
    const confirmPasswordControl = this.form.get('cPassword') as FormControl;
    if (this.form.get('password')?.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ invalidConfirmation: true });
    } else {
      confirmPasswordControl.updateValueAndValidity();
    }
    this.userInitiatedChange = true;
  }

  get getPassword() {
    return this.form.get('password');
  } 
}
