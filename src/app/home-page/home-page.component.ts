import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Contact {
  id: number;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'ihb-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      subject: new FormControl(null, [
        Validators.required
      ]),
      message: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onContactSubmit() {
    console.log(this.contactForm.value);
    this.httpClient.post<Contact>('contact', this.contactForm.value).subscribe(
      (contact: Contact) => {
        this.contactForm.reset();
      })
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }
}
