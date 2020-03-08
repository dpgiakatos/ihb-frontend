import { Component, OnInit } from '@angular/core';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  faBell = faBell;
  constructor() {
  }

  ngOnInit(): void {
  }

}
