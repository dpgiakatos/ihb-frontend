import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { HospitalTreatment } from './hospital-treatment.model';
import { ActivatedRoute } from '@angular/router';
import { IS_DOCTOR } from '../user-dashboard.component';
import { HospitalTreatmentsService } from './hospital-treatment.service';

@Component({
  selector: 'ihb-hospital-treatment',
  templateUrl: './hospital-treatment.component.html',
  styleUrls: ['./hospital-treatment.component.css']
})
export class HospitalTreatmentComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  showSpinner = true;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    cause: new FormControl(null, [Validators.required]),
    treatment: new FormControl(null, [Validators.required]),
    starts: new FormControl(this.calendar.getToday(), [Validators.required]),
    finishes: new FormControl(this.calendar.getToday(), [Validators.required])
  });

  adding = false;
  editing = false;
  currentlyEditingId: string;

  treatmentList: HospitalTreatment[] = [];
  page = 1;
  limit = 10;
  count: number;

  userId?: string;

  constructor(
    private treatmentsService: HospitalTreatmentsService,
    private activatedRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    @Inject(IS_DOCTOR) public isDoctor: boolean
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.parent?.params.id;

    this.fetchCurrentPage();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (!this.editing) {
      this.treatmentsService.create(this.form.value, this.userId).subscribe((treatment: HospitalTreatment) => {
        if ((this.count / this.limit) < this.page) {
          this.treatmentList.push(treatment);
        }
        this.form.reset();
        this.form.get('date')?.setValue(this.dateAdapter.toModel(this.calendar.getToday()));
        this.count++;
        this.adding = false;
      });
      return;
    }

    this.treatmentsService.edit(this.currentlyEditingId, this.form.value).subscribe((treatment: HospitalTreatment) => {
        this.treatmentList[this.treatmentList.map(x => x.id).indexOf(this.currentlyEditingId)] = treatment;
        this.form.reset();
        this.form.get('date')?.setValue(this.dateAdapter.toModel(this.calendar.getToday()));
        this.editing = false;
        this.adding = false;
      });
  }

  setEditForm(treatment: HospitalTreatment) {
    this.editing = true;
    this.adding = true;
    this.form.patchValue(treatment);
    this.currentlyEditingId = treatment.id!;
  }

  enableAddForm() {
    this.adding = true;
    this.form.reset();
    this.form.get('date')?.setValue(this.dateAdapter.toModel(this.calendar.getToday()));
  }

  closeAddForm() {
    this.adding = false;
    this.editing = false;
  }

  onDelete(treatment: HospitalTreatment) {
    this.treatmentsService.delete(treatment.id!).subscribe(() => {
      this.fetchCurrentPage();
    });
  }

  fetchCurrentPage() {
    this.treatmentsService.get(this.page, this.userId).subscribe(response => {
      this.treatmentList = response.treatments;
      this.count = response.count;
      this.showSpinner = false;
    });
  }


}
