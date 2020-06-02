import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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

interface Hospital {
  id: number;
  name: string;
  city: string;
  country: string;
  starts: string;
  finishes: string;
  cause: string;
  treatment: string;
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
  
  hospitalId: number;
  hospitalList: Hospital[] = [];
  hospitalListForm: FormGroup;  
  addHospitalForm: FormGroup;
  hospitalPageNumber = 1;
  hospitalPageSize = 10;
  hospitalSize: number;
  editHospitalForm = false;

  vaccinationList: Vaccination[] = [];
  extraVaccinationList: ExtraVaccination[] = [];
  extraVaccinationPage = 1;
  extraVaccinationPageSize = 10;
  extraVaccinationSize: number;
  userId: string;

  constructor(
    private calendar: NgbCalendar,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private jwt: JwtHelperService
    ) {
      this.userId = this.activatedRoute.snapshot.params.id;
      const accessToken = localStorage.getItem('access-token');
      if (!this.userId && accessToken) {
        this.userId = jwt.decodeToken(accessToken).id;
      }
  }

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
      starts: new FormControl(null, [
        Validators.required
      ]),
      finishes: new FormControl(null, [
        Validators.required
      ])
    });

    this.vaccinationListForm = new FormGroup({});
    let params = new HttpParams();
    params = params.append('userId', this.userId);
    params = params.append('page', this.extraVaccinationPage.toString());

    forkJoin({
      vaccinesList: this.httpClient.get<Vaccination[]>('dashboard/vaccinations'),
      vaccineValues: this.httpClient.get<VaccinationValues[]>('dashboard/user_vaccines/' + this.userId),
      extraVaccinesList: this.httpClient.get<ExtraVaccination[]>('dashboard/extra_vaccinations', {params}),
      countExtraVaccines: this.httpClient.get<number>('dashboard/count_extra_vaccinations/' + this.userId)
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

    forkJoin({
      hospitalList: this.httpClient.get<Hospital[]>('user/' + this.userId + '/hospital-treatments'),
    }).subscribe( values => {
      this.hospitalList = values.hospitalList;
    })
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
    this.httpClient.post('dashboard/edit_vaccinations/' + this.userId, this.vaccinationListForm.value)
      .subscribe(() => {
        this.vaccinationListForm.disable();
        this.editVaccinationList = !this.editVaccinationList;
      });
  }

  onExtraVaccinationSubmit() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (!this.editExtraVaccination) {
      this.httpClient.post<ExtraVaccination>('dashboard/add_extra_vaccinations/' + this.userId, this.addExtraVaccinationForm.value)
        .subscribe((vaccination: ExtraVaccination) => {
          if ((this.extraVaccinationSize / this.extraVaccinationPageSize) < this.extraVaccinationPage) {
            this.extraVaccinationList.push(vaccination);
          }
          this.addExtraVaccinationForm.reset();
          this.addExtraVaccinationForm.get('date')?.setValue(this.calendar.getToday());
          this.extraVaccinationSize++;
        });
    } else {
      let params = new HttpParams();
      params = params.append('vaccineId', this.extraVaccineId.toString());
      params = params.append('userId', this.userId);
      this.httpClient.put<ExtraVaccination>('dashboard/edit_extra_vaccinations', this.addExtraVaccinationForm.value, {params})
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
    let params = new HttpParams();
    params = params.append('vaccineId', vaccine.id.toString());
    params = params.append('userId', this.userId);
    this.httpClient.delete('dashboard/delete_extra_vaccinations', {params})
      .subscribe(() => {
        this.extraVaccinePage();
        this.extraVaccinationSize--;
      });
  }

  extraVaccinePage() {
    let params = new HttpParams();
    params = params.append('vaccinePageId', this.extraVaccinationPage.toString());
    params = params.append('userId', this.userId);
    this.httpClient.get<ExtraVaccination[]>('dashboard/extra_vaccinations', {params})
      .subscribe(value => {
      this.extraVaccinationList = value;
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
    console.log(this.addHospitalForm.value);
    
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (!this.editHospitalForm)
    {
      this.httpClient.post<Hospital>('user/' + this.userId + '/hospital-treatments', this.addHospitalForm.value).subscribe((hospital: Hospital) => {
        if ((this.hospitalSize / this.hospitalPageSize) < this.hospitalPageNumber)
        {
          this.hospitalList.push(hospital);
        }
        
        this.addHospitalForm.reset();    
        this.hospitalPage()           
        this.hospitalSize++;
      })
    } else {
      this.httpClient.put<Hospital>('user/hospitals/' + this.hospitalId, this.addHospitalForm.value).subscribe (
        (hospital: Hospital) => {
          this.hospitalList[this.hospitalList.map(hospital => hospital.id).indexOf(this.hospitalId)] = hospital;
          this.addHospitalForm.reset();
          this.editHospitalForm = false;
        }
      )
    }
  }

  hospitalPage() {
    forkJoin({
      list: this.httpClient.get<Hospital[]>('user/' + this.userId + '/hospital-treatments'),
    }).subscribe( value => {
      this.hospitalList = value.list;
    });
  }

  addHospital() {
    this.addHospitalTreatment = !this.addHospitalTreatment;
    if (this.addHospitalTreatment) {
      this.addHospitalForm.reset();
    }
  }

  setEditHospitalForm(hospital: Hospital) {    
    this.editHospitalForm = true;
    this.addHospitalForm.setValue({
      name: hospital.name,
      city: hospital.city,
      country: hospital.country,
      cause: hospital.cause,
      treatment: hospital.treatment,
      starts: hospital.starts,
      finishes: hospital.finishes,
    });
    this.hospitalId = hospital.id;
    if (!this.addHospitalTreatment) {
      this.addHospitalTreatment = !this.addHospitalTreatment;
    }
  }

  onDeleteHospitalSubmit(hospital: Hospital) {  
    this.httpClient.delete('user/hospitals/' + hospital.id).subscribe(() => {
      this.hospitalPage()
      this.hospitalSize--;
    })
  }

  validator(control: AbstractControl | null): boolean {
    if (!control) {
      throw new Error('Validating null control');
    }
    return control.invalid && control.dirty && control.touched;
  }
}
