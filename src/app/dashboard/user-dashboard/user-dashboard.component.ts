import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface VaccinationList {
  id: number;
  name: string;
}

@Component({
  selector: 'ihb-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  editPersonalInformation = false;
  editVaccinationList = false;
  addExtraVaccination = false;
  faCalendarAlt = faCalendarAlt;
  addAllergicDisease = false;
  addHospitalTreatment = false;
  personalForm: FormGroup;
  vaccinationListForm: FormGroup;
  addExtraVaccinationForm: FormGroup;
  addAllergicForm: FormGroup;
  addHospitalForm: FormGroup;
  vaccinationList: Observable<VaccinationList[]>;

  constructor(
    private calendar: NgbCalendar,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.personalForm = new FormGroup({
      fName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      lName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      ssnvs: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      date: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      country: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      fFName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      fLName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      mFName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      mLName: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      email: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required,
        Validators.email
      ]),
      mPhone: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ]),
      ePhone: new FormControl({
        value: null,
        disabled: true
      }, [
        Validators.required
      ])
    });
    this.addExtraVaccinationForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      date: new FormControl(this.calendar.getToday(), [
        Validators.required
      ]),
      description: new FormControl(null, [
        Validators.required
      ])
    });
    this.addAllergicForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      dDescription: new FormControl(null, [
        Validators.required
      ]),
      tDescription: new FormControl(null, [
        Validators.required
      ])
    });
    this.addHospitalForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      city: new FormControl(null, [
        Validators.required
      ]),
      country: new FormControl(null, [
        Validators.required
      ]),
      cause: new FormControl(null, [
        Validators.required
      ]),
      treatment: new FormControl(null, [
        Validators.required
      ]),
      starts: new FormControl(this.calendar.getToday(), [
        Validators.required
      ]),
      finishes: new FormControl(this.calendar.getToday(), [
        Validators.required
      ])
    });
    this.vaccinationListForm = new FormGroup({});
    this.vaccinationList = this.httpClient
      .get<VaccinationList[]>('http://localhost:3000/dashboard/vaccinations')
      .pipe(tap(value => {
        for (const vaccine of value) {
          this.vaccinationListForm.addControl(vaccine.id.toString(), new FormControl({
            value: null,
            disabled: true
          }));
        }
      }));
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

  editVaccination() {
    this.editVaccinationList = !this.editVaccinationList;
    this.vaccinationListForm.enable();
  }

  onVaccinationSubmit() {
    console.log(this.vaccinationListForm.value);
    this.vaccinationListForm.disable();
    this.editVaccinationList = !this.editVaccinationList;
  }

  onExtraVaccinationSubmit() {
    this.addExtraVaccination = !this.addExtraVaccination;
    console.log(this.addExtraVaccinationForm.value);
    this.addExtraVaccinationForm.reset();
    this.addExtraVaccinationForm.get('date')?.setValue(this.calendar.getToday());
  }

  addVaccination() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (this.addExtraVaccination) {
      this.addExtraVaccinationForm.reset();
      this.addExtraVaccinationForm.get('date')?.setValue(this.calendar.getToday());
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
    this.addHospitalForm.get('starts')?.setValue(this.calendar.getToday());
    this.addHospitalForm.get('finishes')?.setValue(this.calendar.getToday());
  }

  addHospital() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (this.addHospitalTreatment) {
      this.addHospitalForm.reset();
      this.addHospitalForm.get('starts')?.setValue(this.calendar.getToday());
      this.addHospitalForm.get('finishes')?.setValue(this.calendar.getToday());
    }
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }
}
