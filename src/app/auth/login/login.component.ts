import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UnprocessableEntitySchema } from '../../helper/UnprocessableEntitySchema';

@Component({
  selector: 'ihb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/dashboard/user');
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof ErrorEvent) {
        console.log('network error');
      }
      if (err.status === 401) {
        this.form.setErrors({ invalidCredentials: true });
      }
    });
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }

}
