import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllergicDiseases } from './allergic-diseases.model';
import { AllergicDiseasesService } from './allergic-diseases.service';
import { ActivatedRoute } from '@angular/router';
import { IS_DOCTOR } from '../user-dashboard.component';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { maxLength } from '../../../helper/length.validator';

@Component({
  selector: 'ihb-allergic-diseases',
  templateUrl: './allergic-diseases.component.html',
  styleUrls: ['./allergic-diseases.component.css']
})
export class AllergicDiseasesComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  showSpinner = true;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required, maxLength(255)]),
    diseaseDescription: new FormControl(null, [Validators.required, maxLength(255)]),
    treatmentDescription: new FormControl(null, [Validators.required, maxLength(255)])
  });

  adding = false;
  editing = false;
  currentlyEditingId: string;

  allergicList: AllergicDiseases[] = [];
  page = 1;
  limit = 10;
  count: number;

  userId?: string;

  constructor(
    private allergicService: AllergicDiseasesService,
    private activatedRoute: ActivatedRoute,
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
      this.allergicService.create(this.form.value, this.userId).subscribe((allergic: AllergicDiseases) => {
        if ((this.count / this.limit) < this.page) {
          this.allergicList.push(allergic);
        }
        this.form.reset();
        this.count++;
        this.adding = false;
      });
      return;
    }

    this.allergicService.edit(this.currentlyEditingId, this.form.value).subscribe((allergic: AllergicDiseases) => {
      this.allergicList[this.allergicList.map(x => x.id).indexOf(this.currentlyEditingId)] = allergic;
      this.form.reset();
      this.editing = false;
      this.adding = false;
    });
  }

  setEditForm(allergic: AllergicDiseases) {
    this.editing = true;
    this.adding = true;
    this.form.patchValue(allergic);
    this.currentlyEditingId = allergic.id!;
  }

  enableAddForm() {
    this.adding = true;
    this.form.reset();
  }

  closeAddForm() {
    this.adding = false;
    this.editing = false;
  }

  onDelete(allergic: AllergicDiseases) {
    this.allergicService.delete(allergic.id!).subscribe(() => {
      this.fetchCurrentPage();
    });
  }

  fetchCurrentPage() {
    this.allergicService.get(this.page, this.userId).subscribe(response => {
      this.allergicList = response.allergics;
      this.count = response.count;
      this.showSpinner = false;
    });
  }

}
