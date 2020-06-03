import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalTreatmentComponent } from './hospital-treatment.component';

describe('HospitalTreatmentComponent', () => {
  let component: HospitalTreatmentComponent;
  let fixture: ComponentFixture<HospitalTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
