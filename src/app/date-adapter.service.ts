import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NgbPlainDateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (!value) {
      return null;
    }
    const [year, month, day] = value.split('-');
    return {
      year: Number(year),
      month: Number(month),
      day: Number(day)
    };
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (!date) {
      return null;
    }
    return `${date.year}-${date.month < 10 ? '0' + date.month : date.month}-${date.day < 10 ? '0' + date.day : date.day}`;
  }
}
