import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTabDashboardComponent } from './user-tab-dashboard.component';

describe('UserTabDashboardComponent', () => {
  let component: UserTabDashboardComponent;
  let fixture: ComponentFixture<UserTabDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTabDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTabDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
