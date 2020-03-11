import { Component, OnInit } from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  addExtraVaccination = false;
  model;
  faCalendarAlt = faCalendarAlt;

  constructor() { }

  ngOnInit(): void {
  }

  addVaccination() {
    this.addExtraVaccination = !this.addExtraVaccination;
  }
}
