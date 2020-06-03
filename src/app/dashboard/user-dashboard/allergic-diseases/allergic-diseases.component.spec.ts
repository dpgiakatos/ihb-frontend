import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergicDiseasesComponent } from './allergic-diseases.component';

describe('AllergicDiseasesComponent', () => {
  let component: AllergicDiseasesComponent;
  let fixture: ComponentFixture<AllergicDiseasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergicDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergicDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
