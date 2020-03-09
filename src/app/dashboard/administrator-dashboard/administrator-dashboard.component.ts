import {Component, OnInit, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

interface User {
  id?: number;
  name: string;
  mode: string[];
}

const USERS: User[] = [
  {
    name: 'User 1',
    mode: ['User']
  },
  {
    name: 'User 2',
    mode: ['Doctor']
  },
  {
    name: 'User 3',
    mode: ['Administrator']
  },
  {
    name: 'User 4',
    mode: ['Doctor', 'Administrator']
  }
];

function search(text: string, pipe: PipeTransform): User[] {
  return USERS.filter(user => {
    const term = text.toLowerCase();
    return user.name.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-administrator-dashboard',
  templateUrl: './administrator-dashboard.component.html',
  styleUrls: ['./administrator-dashboard.component.css'],
  providers: [DecimalPipe]
})
export class AdministratorDashboardComponent implements OnInit {

  users$: Observable<User[]>;
  searchBox = new FormControl('');
  page = 1;
  pageSize = 2;
  collectionSize = USERS.length;

  constructor(pipe: DecimalPipe) {
    this.users$ = this.searchBox.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
  }

  get users(): User[] {
    return USERS
      .map((user, i) => ({id: i+1, ...user}))
      .slice((this.page-1)*this.pageSize, (this.page-1)*this.pageSize+this.pageSize);
  }
}
