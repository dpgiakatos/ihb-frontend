import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabService } from './tab.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService, Role } from '../../../../auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModalComponent } from '../../../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'ihb-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, OnDestroy {

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
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.fetchPage();
    this.onDoctorRoleChange();
    this.onAdministratorRoleChange();
    this.hasApplication();
  }

  ngOnDestroy() {
    this.subscriptionDoctor.unsubscribe();
    this.subscriptionAdministrator.unsubscribe();
  }

  fetchPage() {
    this.tabService.get(this.userId).subscribe(value => {
      this.name.setValue(value.info.firstName + ' ' + value.info.lastName);
      this.email.setValue(value.info.email);
      value.role.forEach(role => {
        if (role === Role.Doctor) {
          this.doctor.setValue(true, { emitEvent: false });
        } else if (role === Role.Administrator) {
          this.administrator.setValue(true, { emitEvent: false });
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
          return this.tabService.set(this.userId, Role.Doctor);
        } else {
          return this.tabService.deleteRole(this.userId, Role.Doctor);
        }
      })
    ).subscribe();
  }

  onAdministratorRoleChange() {
    this.subscriptionAdministrator = this.administrator.valueChanges.pipe(
      switchMap(value => {
        if (value) {
          return this.tabService.set(this.userId, Role.Administrator);
        } else {
          return this.tabService.deleteRole(this.userId, Role.Administrator);
        }
      })
    ).subscribe();
  }

  openDeleteConfirmationModal() {
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
    modalRef.result.then(result => {
      if (result === true) {
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
    }).catch(() => {});
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
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent);
    modalRef.result.then(result => {
      if (result === true) {
        this.tabService.deleteApplication(this.userId).subscribe(() => {
          this.router.navigateByUrl('/dashboard/administrator/applications');
        });
      }
    }).catch(() => {});
  }
}
