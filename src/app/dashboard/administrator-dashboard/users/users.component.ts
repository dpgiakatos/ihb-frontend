import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ihb-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: User[] = [];
  page = 1;
  limit = 10;
  count: number;

  search = new FormControl('');
  doctor = new FormControl(false);
  administrator = new FormControl(false);

  subscriptionSearch: Subscription;
  subscriptionDoctor: Subscription;
  subscriptionAdministrator: Subscription;

  showSpinner: boolean;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchCurrentPage();
    this.fetchDoctors();
    this.fetchAdministrators();
    this.fetchSearching();
  }

  fetchCurrentPage() {
    this.showSpinner = true;
    this.usersService.get(this.search.value, this.page, this.doctor.value, this.administrator.value).subscribe(response => {
      this.userList = response.users;
      this.count = response.count;
      this.showSpinner = false;
    });
  }

  fetchDoctors() {
    this.subscriptionDoctor = this.doctor.valueChanges.pipe(
      tap(() => {
        this.userList = [];
      }),
      switchMap(value => {
        this.showSpinner = true;
        return this.usersService.get(this.search.value, this.page, value, this.administrator.value);
      })
    ).subscribe(value => {
      this.userList = value.users;
      this.count = value.count;
      this.showSpinner = false;
    });
  }

  fetchAdministrators() {
    this.subscriptionAdministrator = this.administrator.valueChanges.pipe(
      tap(() => {
        this.userList = [];
      }),
      switchMap(value => {
        this.showSpinner = true;
        return this.usersService.get(this.search.value, this.page, this.doctor.value, value);
      })
    ).subscribe(value => {
      this.userList = value.users;
      this.count = value.count;
      this.showSpinner = false;
    });
  }

  fetchSearching() {
    this.subscriptionSearch = this.search.valueChanges.pipe(
      tap(input => {
        if (input.length === 0) {
          this.userList = [];
        }
      }),
      // debounceTime(250),
      switchMap(value => {
        this.showSpinner = true;
        return this.usersService.get(value, this.page, this.doctor.value, this.administrator.value);
      })
    ).subscribe(value => {
      this.userList = value.users;
      this.count = value.count;
      this.showSpinner = false;
    });
  }
}
