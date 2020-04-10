import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  editPersonalInformation = false;
  addExtraVaccination = false;
  faCalendarAlt = faCalendarAlt;
  addAllergicDisease = false;
  addHospitalTreatment = false;
  personalForm;
  addExtraVaccinationForm;
  addAllergicForm;
  addHospitalForm;

  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.personalForm = new FormGroup({
      'fName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'lName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'ssnvs': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'date': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'country': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'fFName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'fLName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'mFName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'mLName': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'email': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'mPhone': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      'ePhone': new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ])
    });
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
      'starts': new FormControl(this.calendar.getToday(), [
        Validators.required
      ]),
      'finishes': new FormControl(this.calendar.getToday(), [
        Validators.required
      ])
    });
  }

  onPersonalSubmit() {
    console.log(this.personalForm.value);
    this.personalForm.reset();
    this.personalForm.disable();
    this.editPersonalInformation = !this.editPersonalInformation;
  }

  editPersonal() {
    this.editPersonalInformation = !this.editPersonalInformation;
    this.personalForm.enable();
  }

  onExtraVaccinationSubmit() {
    this.addExtraVaccination = !this.addExtraVaccination;
    console.log(this.addExtraVaccinationForm.value);
    this.addExtraVaccinationForm.reset();
    this.addExtraVaccinationForm.get('date').setValue(this.calendar.getToday());
  }

  addVaccination() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (this.addExtraVaccination) {
      this.addExtraVaccinationForm.reset();
      this.addExtraVaccinationForm.get('date').setValue(this.calendar.getToday());
    }
  }

  onAllergicFormSubmit() {
    this.addAllergicDisease = !this.addAllergicDisease;
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
    this.addHospitalTreatment = !this.addHospitalTreatment;
    console.log(this.addHospitalForm.value);
    this.addHospitalForm.reset();
    this.addHospitalForm.get('starts').setValue(this.calendar.getToday());
    this.addHospitalForm.get('finishes').setValue(this.calendar.getToday());
  }

  addHospital() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (this.addHospitalTreatment) {
      this.addHospitalForm.reset();
      this.addHospitalForm.get('starts').setValue(this.calendar.getToday());
      this.addHospitalForm.get('finishes').setValue(this.calendar.getToday());
    }
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
