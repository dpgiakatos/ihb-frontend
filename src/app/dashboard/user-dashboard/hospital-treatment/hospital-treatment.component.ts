import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ihb-hospital-treatment',
  templateUrl: './hospital-treatment.component.html',
  styleUrls: ['./hospital-treatment.component.css']
})
export class HospitalTreatmentComponent implements OnInit {

  addHospitalTreatment = false;
  faCalendarAlt = faCalendarAlt;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    cause: new FormControl(null, [Validators.required]),
    treatment: new FormControl(null, [Validators.required]),
    starts: new FormControl(this.calendar.getToday(), [Validators.required]),
    finishes: new FormControl(this.calendar.getToday(), [Validators.required])
  });

  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {

  }


  onHospitalFormSubmit() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    this.form.reset();
    this.form.get('starts')?.setValue(this.calendar.getToday());
    this.form.get('finishes')?.setValue(this.calendar.getToday());
  }

  addHospital() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (this.addHospitalTreatment) {
      this.form.reset();
      this.form.get('starts')?.setValue(this.calendar.getToday());
      this.form.get('finishes')?.setValue(this.calendar.getToday());
    }
  }


}
