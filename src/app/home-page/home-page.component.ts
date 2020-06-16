import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { maxLength } from '../helper/length.validator';
import { AuthService } from '../auth/auth.service';
import { ToastsService } from '../toasts/toasts.service';

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
  @ViewChild('successToast') successToastTemplate: TemplateRef<{}>;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastsService: ToastsService
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
      this.toastsService.show(this.successToastTemplate, { className: 'bg-success text-light', delay: 5000 });
      // this.contactForm.reset();
    });
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
