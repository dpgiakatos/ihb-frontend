import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Vaccination {
  id: number;
  name: string;
}

interface VaccinationValues {
  id: number;
  name: string;
}

interface ExtraVaccination {
  id: number;
  name: string;
  date: string;
  description: string;
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
  editExtraVaccination = false;
  extraVaccineId: number;
  faCalendarAlt = faCalendarAlt;
  addAllergicDisease = false;
  addHospitalTreatment = false;
  personalForm: FormGroup;
  vaccinationListForm: FormGroup;
  addExtraVaccinationForm: FormGroup;
  addAllergicForm: FormGroup;
  addHospitalForm: FormGroup;
  vaccinationList: Vaccination[] = [];
  extraVaccinationList: ExtraVaccination[] = [];
  extraVaccinationPage = 1;
  extraVaccinationPageSize = 10;
  extraVaccinationSize: number;

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
    forkJoin({
      vaccinesList: this.httpClient.get<Vaccination[]>('dashboard/vaccinations'),
      vaccineValues: this.httpClient.get<VaccinationValues[]>('dashboard/user_vaccines'),
      extraVaccinesList: this.httpClient.get<ExtraVaccination[]>('dashboard/extra_vaccinations/' + this.extraVaccinationPage),
      countExtraVaccines: this.httpClient.get<number>('dashboard/count_extra_vaccinations')
    }).subscribe(values => {
      this.vaccinationList = values.vaccinesList;
      for (const vaccine of values.vaccinesList) {
        this.vaccinationListForm.addControl(vaccine.id.toString(), new FormControl({
          value: values.vaccineValues.some(val => val.id === vaccine.id),
          disabled: true
        }));
      }
      this.extraVaccinationList = values.extraVaccinesList;
      this.extraVaccinationSize = values.countExtraVaccines;
    });
  }

  setDateAsObject(val: string) {
    const date = new Date(val);
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
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
    this.httpClient.post('dashboard/edit_vaccinations', this.vaccinationListForm.value)
      .subscribe(() => {
        this.vaccinationListForm.disable();
        this.editVaccinationList = !this.editVaccinationList;
      });
  }

  onExtraVaccinationSubmit() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (!this.editExtraVaccination) {
      this.httpClient.post<ExtraVaccination>('dashboard/add_extra_vaccinations', this.addExtraVaccinationForm.value)
        .subscribe((vaccination: ExtraVaccination) => {
          if ((this.extraVaccinationSize / this.extraVaccinationPageSize) <= this.extraVaccinationPage) {
            this.extraVaccinationList.push(vaccination);
          }
          this.addExtraVaccinationForm.reset();
          this.addExtraVaccinationForm.get('date')?.setValue(this.calendar.getToday());
          this.extraVaccinationSize++;
        });
    } else {
      this.httpClient.put<ExtraVaccination>('dashboard/edit_extra_vaccinations/' + this.extraVaccineId, this.addExtraVaccinationForm.value)
        .subscribe((vaccination: ExtraVaccination) => {
          this.extraVaccinationList[this.extraVaccinationList.map(vaccine => vaccine.id).indexOf(this.extraVaccineId)] = vaccination;
          this.addExtraVaccinationForm.reset();
          this.addExtraVaccinationForm.get('date')?.setValue(this.calendar.getToday());
          this.editExtraVaccination = false;
        });
    }
  }

  setEditExtraVaccinationForm(vaccine: ExtraVaccination) {
    this.editExtraVaccination = true;
    this.addExtraVaccinationForm.setValue({
      name: vaccine.name,
      date: this.setDateAsObject(vaccine.date),
      description: vaccine.description
    });
    this.extraVaccineId = vaccine.id;
    if (!this.addExtraVaccination) {
      this.addExtraVaccination = !this.addExtraVaccination;
    }
  }

  onDeleteExtraVaccinationSubmit(vaccine: ExtraVaccination) {
    this.httpClient.delete('dashboard/delete_extra_vaccinations/' + vaccine.id)
      .subscribe(() => {
        this.extraVaccinePage();
        this.extraVaccinationSize--;
      });
  }

  extraVaccinePage() {
    forkJoin({
      list: this.httpClient.get<ExtraVaccination[]>('dashboard/extra_vaccinations/' + this.extraVaccinationPage)
    }).subscribe(value => {
      this.extraVaccinationList = value.list;
    });
  }

  addVaccination() {
    this.addExtraVaccination = !this.addExtraVaccination;
    this.editExtraVaccination = false;
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
