import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ihb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngbCarousel: NgbCarouselConfig) { }

  ngOnInit() {
    this.ngbCarousel.pauseOnHover = false;
  }
}
