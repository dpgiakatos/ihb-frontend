import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { maxLength } from '../helper/length.validator';
import { AuthService } from '../auth/auth.service';

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
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        maxLength(255)
      ]),
      subject: new FormControl(null, [
        Validators.required,
        maxLength(255)
      ]),
      message: new FormControl(null, [
        Validators.required,
        maxLength(5000)
      ])
    });
  }

  onContactSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.httpClient.post<Contact>('contact', this.contactForm.value).subscribe(() => {
      // this.contactForm.reset();
    });
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
