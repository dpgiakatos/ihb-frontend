import {Component, OnInit} from '@angular/core';
import {faFacebookSquare, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import {faCopyright} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faCopyright = faCopyright;

  constructor() {
  }

  ngOnInit(): void {
  }
}
