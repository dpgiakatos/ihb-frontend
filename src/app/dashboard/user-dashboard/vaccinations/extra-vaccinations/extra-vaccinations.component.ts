import { Component, OnInit, Inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ExtraVaccination } from './extra-vaccinations.interface';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ExtraVaccinationsService } from './extra-vaccinations.service';
import { IS_DOCTOR } from 'src/app/auth/auth-utilities.module';

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

  addExtraVaccination = false;
  editExtraVaccination = false;
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
    @Inject(IS_DOCTOR) public isDoctor: boolean
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.parent?.params.id;

    this.fetchCurrentPage();
  }

  onExtraVaccinationSubmit() {
    this.addExtraVaccination = !this.addExtraVaccination;
    if (!this.editExtraVaccination) {
      this.extraVaccinationsService.create(this.userId!, this.form.value).subscribe((vaccination: ExtraVaccination) => {
        if ((this.count / this.limit) < this.page) {
          this.extraVaccinationList.push(vaccination);
        }
        this.form.reset();
        this.form.get('date')?.setValue(this.calendar.getToday());
        this.count++;
      });
      return;
    }
    this.extraVaccinationsService.edit(this.currentlyEditingId, this.form.value).subscribe((vaccination: ExtraVaccination) => {
        this.extraVaccinationList[this.extraVaccinationList.map(vaccine => vaccine.id).indexOf(this.currentlyEditingId)] = vaccination;
        this.form.reset();
        this.form.get('date')?.setValue(this.calendar.getToday());
        this.editExtraVaccination = false;
      });
  }

  setEditExtraVaccinationForm(vaccine: ExtraVaccination) {
    this.editExtraVaccination = true;
    this.form.patchValue(vaccine);
    this.currentlyEditingId = vaccine.id!;
    if (!this.addExtraVaccination) {
      this.addExtraVaccination = !this.addExtraVaccination;
    }
  }

  enableAddForm() {
    this.addExtraVaccination = !this.addExtraVaccination;
    this.editExtraVaccination = false;
    if (this.addExtraVaccination) {
      this.form.reset();
      this.form.get('date')?.setValue(this.calendar.getToday());
    }
  }

  onDeleteVaccination(vaccine: ExtraVaccination) {
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
