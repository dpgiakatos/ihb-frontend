import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'ihb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMenuCollapsed = true;

  constructor(
    private authService: AuthService
  ) { }

  collapse() {
    this.isMenuCollapsed = true;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
