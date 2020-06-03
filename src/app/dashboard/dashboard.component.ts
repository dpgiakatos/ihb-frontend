import { Component, OnInit, Inject } from '@angular/core';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role, AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'ihb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faUser = faUser;
  faBell = faBell;

  result: {id: string, roles: string[]};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
