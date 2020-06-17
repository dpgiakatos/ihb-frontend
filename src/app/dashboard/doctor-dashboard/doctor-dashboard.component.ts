import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './doctor-dashboard.model';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
import { Router } from '@angular/router';
import { CountriesService } from 'src/app/shared/countries.service';

@Component({
  selector: 'ihb-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {

  searchBox = new FormControl();
  country = new FormControl(null);
  page = 1;
  limit = 10;
  count: number;

  inputSubscription: Subscription;
  list: User[] = [];

  showSpinner: boolean;
  spinnerTimer: any | null;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private router: Router,
    public countries: CountriesService
  ) { }

  ngOnInit(): void {
    this.inputSubscription = merge(
      this.searchBox.valueChanges.pipe(
        filter(input => {
          if (input.length === 0) {
            this.cancelSpinner();
            return false;
          }
          return true;
        }),
        // debounceTime(350)
      ),
      this.country.valueChanges
    ).pipe(
      switchMap(() => {
        this.scheduleSpinner();
        return this.fetchResults();
      })
    ).subscribe(response => {
      this.list = response.users;
      this.count = response.count;
      this.cancelSpinner();
    });
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
  }

  fetchCurrentPage() {
    this.showSpinner = true;
    this.fetchResults().subscribe(response => {
      this.showSpinner = false;
      this.list = response.users;
      this.count = response.count;
    });
  }

  // tslint:disable-next-line: variable-name
  trackUserResultsBy(_index: number, user: User) {
    return user.userId;
  }

  private scheduleSpinner() {
    if (!this.spinnerTimer) {
      this.spinnerTimer = setTimeout(() => {
        this.spinnerTimer = null;
        this.showSpinner = true;
      }, 500);
    }
  }

  private cancelSpinner() {
    this.showSpinner = false;
    clearTimeout(this.spinnerTimer);
    this.spinnerTimer = null;
  }

  private fetchResults() {
    let params = new HttpParams();
    params = params.append('search', this.searchBox.value);
    params = params.append('page', this.page.toString());
    if (this.country.value) {
      params = params.append('country', this.country.value);
    }
    return this.httpClient.get<{ users: User[], count: number }>('doctor/find', { params });
  }

  openPermissionModal(user: User) {
    const modalRef = this.modalService.open(PermissionModalComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then(result => {
      if (result === true) {
        this.httpClient.get(`doctor/${user.userId}/access`).subscribe(() => {
          this.router.navigate(['dashboard', 'user', user.userId]);
        });
      }
    }).catch(() => {});
  }
}
