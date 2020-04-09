import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

interface Patient {
  name: string;
  ssnvs: number;
}

const PATIENTS: Patient[] = [
  {
    name: 'User 1',
    ssnvs: 17075200
  },
  {
    name: 'User 2',
    ssnvs: 9976140
  },
  {
    name: 'User 3',
    ssnvs: 9629091
  },
  {
    name: 'User 4',
    ssnvs: 9596960
  }
];

function search(text: string, pipe: PipeTransform): Patient[] {
  return PATIENTS.filter(patient => {
    const term = text.toLowerCase();
    return patient.name.toLowerCase().includes(term)
      || pipe.transform(patient.ssnvs).includes(term);
  });
}

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  providers: [DecimalPipe]
})
export class DoctorDashboardComponent implements OnInit {

  patients$: Observable<Patient[]>;
  searchBox = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.patients$ = this.searchBox.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
  }

}
