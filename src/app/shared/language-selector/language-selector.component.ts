import { Component, OnInit, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ihb-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  faGlobe = faGlobe;

  languages = [
    { code: 'en-US', text: 'English' },
    { code: 'el', text: 'Ελληνικά' },
  ];

  loadedUrl: string;
  navigateSubscription: Subscription;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router,
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

}
