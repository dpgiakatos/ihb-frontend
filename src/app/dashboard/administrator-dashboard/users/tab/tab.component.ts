import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabService } from './tab.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ihb-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  userId: string;
  applicationActive: boolean;

  name = new FormControl();
  email = new FormControl();
  doctor = new FormControl(false);
  administrator = new FormControl(false);

  subscriptionDoctor: Subscription;
  subscriptionAdministrator: Subscription;

  showSpinnerInfo = true;
  infoHasLoad = false;
  showSpinnerApp = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.fetchPage();
    this.onDoctorRoleChange();
    this.onAdministratorRoleChange();
    this.hasApplication();
  }

  fetchPage() {
    this.tabService.get(this.userId).subscribe(value => {
      this.name.setValue(value.info.firstName + ' ' + value.info.lastName);
      this.email.setValue(value.info.email);
      value.role.forEach(role => {
        if (role.role === 'Doctor') {
          this.doctor.setValue(true);
        } else if (role.role === 'Administrator') {
          this.administrator.setValue(true);
        }
      });
      this.showSpinnerInfo = false;
      this.infoHasLoad = true;
    });
  }

  onDoctorRoleChange() {
    this.subscriptionDoctor = this.doctor.valueChanges.pipe(
      switchMap(value => {
        if (value) {
          return this.tabService.set(this.userId, 'Doctor');
        } else {
          return this.tabService.deleteRole(this.userId, 'Doctor');
        }
      })
    ).subscribe();
  }

  onAdministratorRoleChange() {
    this.subscriptionAdministrator = this.administrator.valueChanges.pipe(
      switchMap(value => {
        if (value) {
          return this.tabService.set(this.userId, 'Administrator');
        } else {
          return this.tabService.deleteRole(this.userId, 'Administrator');
        }
      })
    ).subscribe();
  }

  onDelete() {
    this.tabService.deleteUser(this.userId).subscribe(() => {
      this.router.navigateByUrl('/dashboard/administrator/users');
    });
  }

  hasApplication() {
    this.tabService.hasApplication(this.userId).subscribe(value => {
      this.applicationActive = value;
      this.showSpinnerApp = false;
    });
  }

  download() {
    this.tabService.downloadDocument(this.userId).subscribe();
  }

  deleteApplication() {
    this.tabService.deleteApplication(this.userId).subscribe(() => {
      this.router.navigateByUrl('/dashboard/administrator/applications');
    });
  }
}
