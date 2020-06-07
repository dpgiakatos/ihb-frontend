import { Component, HostListener, Inject, Optional } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ihb-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent {

  windowScrolled: boolean;
  faArrowUp = faArrowUp;

  constructor(@Optional() @Inject(DOCUMENT) private document: Document) { }


  previousY = 0;
  cancelScrollToTop = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.document?.defaultView) {
      if (this.document?.defaultView.pageYOffset > this.previousY) {
        this.cancelScrollToTop = true;
      }
      this.previousY = this.document?.defaultView.pageYOffset;
      this.windowScrolled = this.document?.defaultView.pageYOffset >= 100;
    } else {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    this.cancelScrollToTop = false;
    const smoothscroll = () => {
      const currentScroll = this.document?.defaultView?.pageYOffset;
      if (currentScroll && currentScroll > 0) {
        if (!this.cancelScrollToTop) {
          window.requestAnimationFrame(smoothscroll.bind(this));
          window.scrollTo(0, currentScroll - (currentScroll / 8));
        } else {
          this.cancelScrollToTop = false;
        }
      }
    };

    smoothscroll();
  }
}
