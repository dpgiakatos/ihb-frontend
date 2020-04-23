import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ihb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      fName: new FormControl(null, [
        Validators.required
      ]),
      lName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      cPassword: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.router.navigateByUrl('/dashboard/user');
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }

  isNotValid(form: FormGroup): boolean {
    return form.invalid || this.isNotSamePassword();
  }

  isNotSamePassword(): boolean {
    return Boolean((this.form.get('password')?.value !== this.form.get('cPassword')?.value) && this.form.get('cPassword')?.touched);
  }
}
