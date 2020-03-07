import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'The save was success',
}, {
  type: 'danger',
  message: 'You saw the health booklet without patient consent',
}];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  alerts: Alert[];
  constructor() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
