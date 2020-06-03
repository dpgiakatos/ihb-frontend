import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ExtraVaccination } from './extra-vaccinations.model';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ExtraVaccinationsService } from './extra-vaccinations.service';
import { IS_DOCTOR } from '../../user-dashboard.component';

@Component({
  selector: 'ihb-extra-vaccinations',
  templateUrl: './extra-vaccinations.component.html',
  styleUrls: ['./extra-vaccinations.component.css']
})
export class ExtraVaccinationsComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    date: new FormControl(this.calendar.getToday(), [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  adding = false;
  editing = false;
  currentlyEditingId: string;

  extraVaccinationList: ExtraVaccination[] = [];
  page = 1;
  limit = 10;
  count: number;

  userId?: string;

  constructor(
    private extraVaccinationsService: ExtraVaccinationsService,
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
      this.extraVaccinationsService.create(this.form.value, this.userId).subscribe((vaccination: ExtraVaccination) => {
        if ((this.count / this.limit) < this.page) {
          this.extraVaccinationList.push(vaccination);
        }
        this.form.reset();
        this.form.get('date')?.setValue(this.dateAdapter.toModel(this.calendar.getToday()));
        this.count++;
        this.adding = false;
      });
      return;
    }

    this.extraVaccinationsService.edit(this.currentlyEditingId, this.form.value).subscribe((vaccination: ExtraVaccination) => {
        this.extraVaccinationList[this.extraVaccinationList.map(vaccine => vaccine.id).indexOf(this.currentlyEditingId)] = vaccination;
        this.form.reset();
        this.form.get('date')?.setValue(this.dateAdapter.toModel(this.calendar.getToday()));
        this.editing = false;
        this.adding = false;
      });
  }

  setEditForm(vaccine: ExtraVaccination) {
    this.editing = true;
    this.adding = true;
    this.form.patchValue(vaccine);
    this.currentlyEditingId = vaccine.id!;
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

  onDelete(vaccine: ExtraVaccination) {
    this.extraVaccinationsService.delete(vaccine.id!).subscribe(() => {
      this.fetchCurrentPage();
    });
  }

  fetchCurrentPage() {
    this.extraVaccinationsService.get(this.page, this.userId).subscribe(response => {
      this.extraVaccinationList = response.vaccinations;
      this.count = response.count;
    });
  }

}
