import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDashboardComponent } from './notification-dashboard.component';

describe('NotificationDashboardComponent', () => {
  let component: NotificationDashboardComponent;
  let fixture: ComponentFixture<NotificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
