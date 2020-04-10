import { Component, HostListener, Inject, Optional } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent {

  windowScrolled: boolean;
  faArrowUp = faArrowUp;

  constructor(@Optional() @Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.windowScrolled = this.document?.defaultView.pageYOffset >= 100;
  }

  scrollToTop() {
    const smoothscroll = () => {
      const currentScroll = this.document?.defaultView.pageYOffset;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll.bind(this));
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    };

    smoothscroll();
  }
}
