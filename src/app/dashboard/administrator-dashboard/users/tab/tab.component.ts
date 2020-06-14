import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabService } from './tab.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';

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

  downloadProgress: number;
  progressBar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private router: Router,
    private authService: AuthService
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
        console.log(value);
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
      const currentUser = this.authService.getClaims()?.id;
      if (currentUser === this.userId) {
        this.authService.logout();
        this.router.navigateByUrl('');
      } else {
        this.router.navigateByUrl('/dashboard/administrator/users');
      }
    });
  }

  hasApplication() {
    this.tabService.hasApplication(this.userId).subscribe(value => {
      this.applicationActive = value;
      this.showSpinnerApp = false;
    });
  }

  download() {
    this.progressBar = true;
    this.tabService.downloadDocument(this.userId).subscribe((event) => {
      console.log(this.downloadProgress);
      if (event.type === HttpEventType.DownloadProgress && event.total) {
        this.downloadProgress = Math.round((event.loaded / event.total) * 100);
      }
      if (event.type === HttpEventType.Response && event.body) {
        this.progressBar = false;
        saveAs(event.body);
      }
    });
  }

  deleteApplication() {
    this.tabService.deleteApplication(this.userId).subscribe(() => {
      this.router.navigateByUrl('/dashboard/administrator/applications');
    });
  }
}
