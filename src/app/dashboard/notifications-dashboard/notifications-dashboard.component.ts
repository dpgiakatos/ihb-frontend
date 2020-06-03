import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Log {
  accessTime: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'ihb-alert-dashboard',
  templateUrl: './notifications-dashboard.component.html',
  styleUrls: ['./notifications-dashboard.component.css']
})
export class NotificationsDashboardComponent implements OnInit {

  logs: Log[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Log[]>('notifications/doctors-logs').subscribe(res => {
      this.logs = res;
    });
  }
}
