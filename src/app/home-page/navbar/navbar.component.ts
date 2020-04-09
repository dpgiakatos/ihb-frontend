import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ihb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  collapse() {
    this.isMenuCollapsed = true;
  }

}
