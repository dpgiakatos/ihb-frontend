import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastsService } from 'src/app/toasts/toasts.service';

@Component({
  selector: 'ihb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  @ViewChild('successVerifyToast', { static: true }) successToastTemplate: TemplateRef<{}>;
  @ViewChild('failVerifyToast', { static: true }) failToastTemplate: TemplateRef<{}>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastsService: ToastsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.queryParams);
    if (this.activatedRoute.snapshot.queryParams.verify === 'true') {
      this.toastsService.show(this.successToastTemplate, { className: 'bg-success text-light', delay: 10000 });
    }
    if (this.activatedRoute.snapshot.queryParams.verify === 'false') {
      this.toastsService.show(this.failToastTemplate, { className: 'bg-danger text-light', delay: 10000 });
    }


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
    if (this.form.invalid) {
      return;
    }
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

  get getPassword() {
    return this.form.get('password');
  }

}
