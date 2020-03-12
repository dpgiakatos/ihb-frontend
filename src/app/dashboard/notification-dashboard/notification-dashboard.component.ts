import { Component, OnInit } from '@angular/core';
import {faFlag} from "@fortawesome/free-solid-svg-icons";

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}
];

@Component({
  selector: 'app-notification-dashboard',
  templateUrl: './notification-dashboard.component.html',
  styleUrls: ['./notification-dashboard.component.css']
})
export class NotificationDashboardComponent implements OnInit {

  alerts: Alert[];
  faFlag = faFlag;

  constructor() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
