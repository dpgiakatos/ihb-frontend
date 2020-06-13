import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecommendedVaccines } from './recommended-vaccines.model';
import { ActivatedRoute } from '@angular/router';
import { RecommendedVaccinationsService } from './recommended-vaccinations.service';
import { IS_DOCTOR } from '../../user-dashboard.component';

@Component({
  selector: 'ihb-recommended-vaccinations',
  templateUrl: './recommended-vaccinations.component.html',
  styleUrls: ['./recommended-vaccinations.component.css']
})
export class RecommendedVaccinationsComponent implements OnInit {

  form = new FormGroup({});

  editing = false;

  vaccines: RecommendedVaccines[];

  userId?: string;

  showSpinner = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vaccinationsService: RecommendedVaccinationsService,
    @Inject(IS_DOCTOR) public isDoctor: boolean
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.parent?.params.id;

    this.vaccinationsService.get(this.userId).subscribe(response => {
      this.vaccines = response.recommendedVaccines;
      for (const vaccine of this.vaccines) {
        this.form.addControl(vaccine.id.toString(), new FormControl({
          value: response.userVaccinations.some(val => val.id === vaccine.id),
          disabled: true
        }));
      }
      this.showSpinner = false;
    });
  }

  onVaccinationSubmit() {
    this.form.disable();
    this.editing = false;
    this.vaccinationsService.edit(this.form.value, this.userId).subscribe();
  }

  editVaccination() {
    this.editing = true;
    this.form.enable();
  }

}
