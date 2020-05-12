import { Component, OnInit } from '@angular/core';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ihb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  faBell = faBell;

  result: {id: string, roles: string[]};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }
}
