import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { PersonalInformationService } from './personal-information.service';
import { ActivatedRoute } from '@angular/router';
import { IS_DOCTOR } from '../user-dashboard.component';

@Component({
  selector: 'ihb-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    ssnvs: new FormControl(null),
    birthDate: new FormControl(null),
    country: new FormControl(null),
    fatherFirstName: new FormControl(null),
    fatherLastName: new FormControl(null),
    motherFirstName: new FormControl(null),
    motherLastName: new FormControl(null),
    mobilePhone: new FormControl(null),
    emergencyContact: new FormControl(null)
  });

  editing = false;

  userId?: string;

  faCalendarAlt = faCalendarAlt;

  constructor(
    private personalService: PersonalInformationService,
    private activatedRoute: ActivatedRoute,
    @Inject(IS_DOCTOR) public isDoctor: boolean
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.parent?.params.id;
    this.form.disable();
    this.personalService.get(this.userId).subscribe(
      result => {
        this.form.patchValue(result);
      }
    );
  }

  onSubmit() {
    console.log('submitting');
    if (this.form.valid) {
      console.log('is valid');
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
