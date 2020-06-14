import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { PersonalInformationService } from './personal-information.service';
import { ActivatedRoute } from '@angular/router';
import { IS_DOCTOR } from '../user-dashboard.component';
import { maxLength } from '../../../helper/length.validator';
import { CountriesService } from 'src/app/shared/countries.service';

@Component({
  selector: 'ihb-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required, maxLength(255)]),
    lastName: new FormControl(null, [Validators.required, maxLength(255)]),
    ssnvs: new FormControl(null, [maxLength(255)]),
    birthDate: new FormControl(null),
    country: new FormControl(null, [maxLength(255)]),
    fatherFirstName: new FormControl(null, [maxLength(255)]),
    fatherLastName: new FormControl(null, [maxLength(255)]),
    motherFirstName: new FormControl(null, [maxLength(255)]),
    motherLastName: new FormControl(null, [maxLength(255)]),
    mobilePhone: new FormControl(null, [maxLength(255)]),
    emergencyContact: new FormControl(null, [maxLength(255)])
  });

  editing = false;

  userId?: string;

  faCalendarAlt = faCalendarAlt;

  showSpinner = true;
  hasData = false;

  constructor(
    private personalService: PersonalInformationService,
    private activatedRoute: ActivatedRoute,
    public countries: CountriesService,
    @Inject(IS_DOCTOR) public isDoctor: boolean
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.parent?.params.id;
    this.form.disable();
    this.personalService.get(this.userId).subscribe(
      result => {
        this.form.patchValue(result);
        this.showSpinner = false;
        this.hasData = true;
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.editing = !this.editing;
      this.personalService.edit(this.form.value).subscribe();
    }
  }

  onEdit() {
    this.editing = !this.editing;
    this.form.enable();
  }

  canEdit() {
    return !this.isDoctor || !this.userId;
  }

}
