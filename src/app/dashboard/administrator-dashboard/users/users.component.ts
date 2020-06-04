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

  doctor = new FormControl(false);
  administrator = new FormControl(false);

  subscriptionDoctor: Subscription;
  subscriptionAdministrator: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchCurrentPage();
    this.subscriptionDoctor = this.doctor.valueChanges.pipe(
      tap(() => {
        this.userList = [];
      }),
      switchMap(value => {
        return this.usersService.get(this.page, value, this.administrator.value);
      })
    ).subscribe(value => {
      this.userList = value.users;
      this.count = value.count;
    });
    this.subscriptionAdministrator = this.administrator.valueChanges.pipe(
      tap(() => {
        this.userList = [];
      }),
      switchMap(value => {
        return this.usersService.get(this.page, this.doctor.value, value);
      })
    ).subscribe(value => {
      this.userList = value.users;
      this.count = value.count;
    });
  }

  fetchCurrentPage() {
    this.usersService.get(this.page, this.doctor.value, this.administrator.value).subscribe(response => {
      this.userList = response.users;
      this.count = response.count;
    });
  }
}
