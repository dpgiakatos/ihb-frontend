import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  addExtraVaccination = false;
  faCalendarAlt = faCalendarAlt;
  addAllergicDisease = false;
  addHospitalTreatment = false;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  addExtraVaccinationForm;
  addAllergicForm;
  addHospitalForm;

  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.addExtraVaccinationForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'date': new FormControl(this.calendar.getToday(), [
        Validators.required
      ]),
      'description': new FormControl(null, [
        Validators.required
      ])
    });
    this.addAllergicForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'dDescription': new FormControl(null, [
        Validators.required
      ]),
      'tDescription': new FormControl(null, [
        Validators.required
      ])
    });
    this.addHospitalForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required
      ]),
      'city': new FormControl(null, [
        Validators.required
      ]),
      'country': new FormControl(null, [
        Validators.required
      ]),
      'cause': new FormControl(null, [
        Validators.required
      ]),
      'treatment': new FormControl(null, [
        Validators.required
      ]),
      'period': new FormControl(null, [
        Validators.required
      ])
    });
  }

  private resetExtraVaccinationForm() {
    this.addExtraVaccinationForm.reset();
    this.addExtraVaccinationForm.get('date').setValue(this.calendar.getToday());
  }

  onExtraVaccinationSubmit() {
    console.log(this.addExtraVaccinationForm.value);
    this.resetExtraVaccinationForm();
  }

  addVaccination() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (this.addExtraVaccination) {
      this.resetExtraVaccinationForm();
    }
  }

  onAllergicFormSubmit() {
    console.log(this.addAllergicForm.value);
    this.addAllergicForm.reset();
  }

  addAllergic() {
    this.addAllergicDisease = !this.addAllergicDisease;
    if (this.addAllergicDisease) {
      this.addAllergicForm.reset();
    }
  }

  onHospitalFormSubmit() {
    this.addHospitalForm.get('period').setValue([this.fromDate, this.toDate]);
    console.log(this.addHospitalForm.value);
    this.addHospitalForm.reset();
    this.fromDate = this.calendar.getToday();
    this.toDate = null;
  }

  addHospital() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (this.addHospitalTreatment) {
      this.addHospitalForm.reset();
      this.fromDate = this.calendar.getToday();
      this.toDate = null;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validator(form: FormControl): boolean {
    if (form.invalid && (form.dirty || form.touched)) {
      return true;
    }
    return false;
  }

  isValid(form: FormGroup): boolean {
    if (form.valid) {
      return false;
    }
    return true;
  }
}
