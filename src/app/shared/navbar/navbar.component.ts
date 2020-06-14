import { Component, OnInit, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'ihb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  faGlobe = faGlobe;
  loadedUrl: string;
  navigateSubscription: Subscription;

  isMenuCollapsed = true;

  languages = [
    { code: 'en-US', text: 'English' },
    { code: 'el', text: 'Ελληνικά' },
  ];

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadedUrl = this.router.url;
    this.navigateSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadedUrl = this.router.url;
    });
  }

  ngOnDestroy() {
    this.navigateSubscription.unsubscribe();
  }

  collapse() {
    this.isMenuCollapsed = true;
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
