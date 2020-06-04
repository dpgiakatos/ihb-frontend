import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { InboxService } from './inbox/inbox.service';
import { ApplicationsService } from './applications/applications.service';
import { UsersService } from './users/users.service';
import { MessageService } from './inbox/message/message.service';
import { TabService } from './users/tab/tab.service';

@Component({
  selector: 'ihb-administrator-dashboard',
  templateUrl: './administrator-dashboard.component.html',
  styleUrls: ['./administrator-dashboard.component.css'],
  providers: [
    InboxService,
    ApplicationsService,
    UsersService,
    MessageService,
    TabService
  ]
})
export class AdministratorDashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  activatedChild: Observable<string | null>;

  ngOnInit() {
    this.activatedChild = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => (this.route.firstChild?.url || of([]))),
      map((urlSegments) => {
        if (urlSegments.length) {
          return urlSegments[0].path;
        }
        return null;
      })
    );
  }
}
