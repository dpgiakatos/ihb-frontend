import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal/modal.component';
import { User } from './doctor-dashboard.interface';

@Component({
  selector: 'ihb-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {

  searchBox = new FormControl();
  country = new FormControl(null);
  subscriptionSearch: Subscription;
  subscriptionCountry: Subscription;
  list: User[] = [];

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscriptionSearch = this.searchBox.valueChanges.pipe(
      tap(input => {
        if (input.length === 0) {
          this.list = [];
        }
      }),
      debounceTime(1000),
      switchMap(value => {
        let params = new HttpParams();
        params = params.append('search', value);
        if (this.country.value) {
          params = params.append('country', this.country.value);
        }
        return this.httpClient.get<User[]>('doctor/find', {params});
      })
    ).subscribe(value => {
      this.list = value;
    });
    this.subscriptionCountry = this.country.valueChanges.pipe(
      tap(input => {
        if (input.length === 0) {
          this.list = [];
        }
      }),
      switchMap(value => {
        return this.httpClient.get<User[]>('doctor/find?search=' + this.searchBox.value + '&country=' + value);
      })
    ).subscribe(value => {
      this.list = value;
    });
  }

  ngOnDestroy() {
    this.list = [];
    this.subscriptionSearch.unsubscribe();
    this.subscriptionCountry.unsubscribe();
  }

  open(user: User) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.user = user;
  }
}
