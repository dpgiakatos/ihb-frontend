import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'ihb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faGooglePlusSquare = faGooglePlusSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
