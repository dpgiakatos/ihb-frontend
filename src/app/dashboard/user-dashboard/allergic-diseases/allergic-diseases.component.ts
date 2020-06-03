import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { AllergicDiseases } from './allergic-diseases.model';

@Component({
  selector: 'ihb-allergic-diseases',
  templateUrl: './allergic-diseases.component.html',
  styleUrls: ['./allergic-diseases.component.css']
})
export class AllergicDiseasesComponent implements OnInit {

  addAllergicDisease = false;
  allergicId: number;
  allergicList: AllergicDiseases[] = [];
  allergicPageNumber = 1;
  allergicPageSize = 10;
  allergicSize: number;
  allergicListForm: FormGroup;
  editAllergicForm = false;

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    dDescription: new FormControl(null, [Validators.required]),
    tDescription: new FormControl(null, [Validators.required])
  });

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    forkJoin({
      allergicList: this.httpClient.get<AllergicDiseases[]>('dashboard/allergic/' + this.allergicPageNumber),
      countAllergic: this.httpClient.get<number>('dashboard/allergic/count_allergic/count')
    }).subscribe(values => {
      this.allergicList = values.allergicList;
      this.allergicSize = values.countAllergic;
    });
  }

  onAllergicFormSubmit() {
    this.addAllergicDisease = !this.addAllergicDisease;
    if (!this.editAllergicForm) {
      this.httpClient.post<AllergicDiseases>('dashboard/allergic', this.form.value).subscribe (
        (allergic: AllergicDiseases) => {
          if ((this.allergicSize / this.allergicPageSize) < this.allergicPageNumber) {
            this.allergicList.push(allergic);
          }
          this.form.reset();
          this.allergicSize++;
        });
    } else {
      this.httpClient.put<AllergicDiseases>('dashboard/allergic/' + this.allergicId, this.form.value).subscribe (
        (allergic: AllergicDiseases) => {
          this.allergicList[this.allergicList.map(allergy => allergy.id).indexOf(this.allergicId)] = allergic;
          this.form.reset();
          this.editAllergicForm = false;
        });
    }
  }

  setEditAllergicForm(allergy: AllergicDiseases) {
    this.editAllergicForm = true;
    this.form.setValue({
      name: allergy.name,
      dDescription: allergy.dDescription,
      tDescription: allergy.tDescription
    });
    this.allergicId = allergy.id;
    if (!this.addAllergicDisease) {
      this.addAllergicDisease = !this.addAllergicDisease;
    }
  }

  onDeleteAllergicSubmit(allergy: AllergicDiseases) {
    this.httpClient.delete('dashboard/allergic/' + allergy.id).subscribe(() => {
      this.allergicPage();
      this.allergicSize--;
    });
  }

  allergicPage() {
    forkJoin({
      list: this.httpClient.get<AllergicDiseases[]>('dashboard/allergic/' + this.allergicPageNumber)
    }).subscribe(value => {
      this.allergicList = value.list;
    });
  }

  addAllergic() {
    this.addAllergicDisease = !this.addAllergicDisease;
    if (this.addAllergicDisease) {
      this.form.reset();
    }
  }

}
