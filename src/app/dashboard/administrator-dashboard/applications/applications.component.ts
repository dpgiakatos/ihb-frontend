import { Component, OnInit } from '@angular/core';
import { Application } from './applications.model';
import { ApplicationsService } from './applications.service';

@Component({
  selector: 'ihb-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  list: Application[] = [];
  limit = 10;
  page = 1;
  count: number;

  constructor(private applicationService: ApplicationsService) { }

  ngOnInit(): void {
    this.fetchCurrentPage();
  }

  fetchCurrentPage() {
    this.applicationService.get(this.page).subscribe(value => {
      this.list = value.applications;
      this.count = value.count;
    });
  }
}
