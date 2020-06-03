import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDashboardComponent } from './alert-dashboard.component';

describe('AlertDashboardComponent', () => {
  let component: AlertDashboardComponent;
  let fixture: ComponentFixture<AlertDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
