import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ExtraVaccinationsComponent } from './user-dashboard/vaccinations/extra-vaccinations/extra-vaccinations.component';
// tslint:disable-next-line: max-line-length
import { RecommendedVaccinationsComponent } from './user-dashboard/vaccinations/recommended-vaccinations/recommended-vaccinations.component';
import { VaccinationsComponent } from './user-dashboard/vaccinations/vaccinations.component';
import { HospitalTreatmentComponent } from './user-dashboard/hospital-treatment/hospital-treatment.component';
import { PersonalInformationComponent } from './user-dashboard/personal-information/personal-information.component';
import { SettingsDashboardComponent } from './settings-dashboard/settings-dashboard.component';
import { AdministratorDashboardComponent } from './administrator-dashboard/administrator-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { NgbDatepickerModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllergicDiseasesComponent } from './user-dashboard/allergic-diseases/allergic-diseases.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DoctorOnlyGuard } from '../auth/guards/doctor-only.guard';
import { SharedModule } from '../shared/shared.module';
import { NotificationsDashboardComponent } from './notifications-dashboard/notifications-dashboard.component';
import { AccessGuard } from './doctor-dashboard/access.guard';
import { AdministratorOnlyGuard } from '../auth/guards/administrator-only.guard';
import { InboxComponent } from './administrator-dashboard/inbox/inbox.component';
import { ApplicationsComponent } from './administrator-dashboard/applications/applications.component';
import { UsersComponent } from './administrator-dashboard/users/users.component';
import { MessageComponent } from './administrator-dashboard/inbox/message/message.component';
import { TabComponent } from './administrator-dashboard/users/tab/tab.component';
import { PermissionModalComponent } from './doctor-dashboard/permission-modal/permission-modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

const userDashboardRoutes: Routes = [
  { path: '', redirectTo: 'personal-information', pathMatch: 'full' },
  { path: 'personal-information', component: PersonalInformationComponent },
  { path: 'vaccinations', component: VaccinationsComponent },
  { path: 'allergic-diseases', component: AllergicDiseasesComponent },
  { path: 'hospital-treatment', component: HospitalTreatmentComponent }
];

const administratorDashboardRoutes: Routes = [
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  { path: 'inbox', component: InboxComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'users', component: UsersComponent },
];

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'notifications', component: NotificationsDashboardComponent },
    { path: 'user', component: UserDashboardComponent, children: [...userDashboardRoutes] },
    {
      path: 'user/:id', component: UserDashboardComponent,
      canActivate: [DoctorOnlyGuard, AccessGuard], children: [...userDashboardRoutes]
    },
    { path: 'doctor', component: DoctorDashboardComponent, canActivate: [DoctorOnlyGuard] },
    {
      path: 'administrator', component: AdministratorDashboardComponent, canActivate: [AdministratorOnlyGuard],
      children: [...administratorDashboardRoutes]
    },
    { path: 'administrator/users/:id', component: TabComponent, canActivate: [AdministratorOnlyGuard] },
    { path: 'administrator/applications/:id', component: TabComponent, canActivate: [AdministratorOnlyGuard] },
    { path: 'administrator/inbox/:id', component: MessageComponent, canActivate: [AdministratorOnlyGuard] },
    { path: 'settings', component: SettingsDashboardComponent }
  ]}
];

const exportedComponents = [
  DashboardComponent,
  UserDashboardComponent,
  DoctorDashboardComponent,
  AdministratorDashboardComponent,
  SettingsDashboardComponent,
  PersonalInformationComponent,
  AllergicDiseasesComponent,
  HospitalTreatmentComponent,
  VaccinationsComponent,
  RecommendedVaccinationsComponent,
  ExtraVaccinationsComponent,
  NotificationsDashboardComponent,
  PermissionModalComponent,
  InboxComponent,
  ApplicationsComponent,
  UsersComponent,
  MessageComponent,
  TabComponent,
  LoadingSpinnerComponent
];

@NgModule({
  declarations: exportedComponents,
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule
  ],
  exports: exportedComponents
})
export class DashboardModule { }
