import { Component, OnInit } from '@angular/core';
import { faUserAlt, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faUserAlt = faUserAlt;
  faBell = faBell;
  constructor() {
  }

  ngOnInit(): void {
  }

}
