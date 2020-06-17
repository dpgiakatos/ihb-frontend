import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users.model';
import { FormControl } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ihb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  userList: User[] = [];
  page = 1;
  limit = 10;
  count: number;

  offset = 0;

  search = new FormControl('');
  doctor = new FormControl(false);
  administrator = new FormControl(false);

  querySubscription: Subscription;

  showSpinner: boolean;

  spinnerTimer: any | null;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.fetchCurrentPage();

    this.querySubscription = merge(
      this.doctor.valueChanges.pipe(
        tap(() => {
          this.showSpinner = true;
          this.userList = [];
        })
      ),
      this.administrator.valueChanges.pipe(
        tap(() => {
          this.showSpinner = true;
          this.userList = [];
        })
      ),
      this.search.valueChanges.pipe(
        tap(() => {
          this.scheduleSpinner();
        })
        // debounceTime(250),
      )
    ).pipe(
      switchMap(() => {
        this.page = 1;
        return this.usersService.get(this.search.value, this.page, this.doctor.value, this.administrator.value);
      })
    ).subscribe(response => {
      this.userList = response.users;
      this.count = response.count;
      this.offset = 0;
      this.cancelSpinner();
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  fetchCurrentPage() {
    this.showSpinner = true;
    this.usersService.get(this.search.value, this.page, this.doctor.value, this.administrator.value).subscribe(response => {
      this.offset = (this.page - 1) * this.limit;
      this.userList = response.users;
      this.count = response.count;
      this.showSpinner = false;
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
}
