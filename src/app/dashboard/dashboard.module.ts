import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ExtraVaccinationsComponent } from './user-dashboard/vaccinations/extra-vaccinations/extra-vaccinations.component';
import { RecommendedVaccinationsComponent } from './user-dashboard/vaccinations/recommended-vaccinations/recommended-vaccinations.component';
import { VaccinationsComponent } from './user-dashboard/vaccinations/vaccinations.component';
import { HospitalTreatmentComponent } from './user-dashboard/hospital-treatment/hospital-treatment.component';
import { PersonalInformationComponent } from './user-dashboard/personal-information/personal-information.component';
import { SettingsDashboardComponent } from './settings-dashboard/settings-dashboard.component';
import { MessageDashboardComponent } from './message-dashboard/message-dashboard.component';
import { UserTabDashboardComponent } from './user-tab-dashboard/user-tab-dashboard.component';
import { AdministratorDashboardComponent } from './administrator-dashboard/administrator-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { NgbDatepickerModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllergicDiseasesComponent } from './user-dashboard/allergic-diseases/allergic-diseases.component';
import { AuthGuard } from '../auth/auth.guard';
import { DoctorOnlyGuard } from '../auth/doctor-only.guard';
import { SharedModule } from '../shared/shared.module';
import { AlertDashboardComponent } from './alert-dashboard/alert-dashboard.component';
import { AccessGuard } from './doctor-dashboard/access.guard';
import { ModalContentComponent } from './doctor-dashboard/modal/modal.component';


const userDashboardRoutes: Routes = [
  { path: '', redirectTo: 'personal-information', pathMatch: 'full' },
  { path: 'personal-information', component: PersonalInformationComponent },
  { path: 'vaccinations', component: VaccinationsComponent },
  { path: 'allergic-diseases', component: AllergicDiseasesComponent },
  { path: 'hospital-treatment', component: HospitalTreatmentComponent }
];

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'alert', component: AlertDashboardComponent },
    { path: 'user', component: UserDashboardComponent, children: [...userDashboardRoutes] },
    { path: 'user/:id', component: UserDashboardComponent, canActivate: [DoctorOnlyGuard, AccessGuard], children: [...userDashboardRoutes] },
    { path: 'doctor', component: DoctorDashboardComponent, canActivate: [DoctorOnlyGuard] },
    { path: 'administrator', component: AdministratorDashboardComponent },
    { path: 'message', component: MessageDashboardComponent },
    { path: 'usertab', component: UserTabDashboardComponent },
    { path: 'settings', component: SettingsDashboardComponent }
  ]}
];

const exportedComponents = [
  DashboardComponent,
  UserDashboardComponent,
  DoctorDashboardComponent,
  AdministratorDashboardComponent,
  UserTabDashboardComponent,
  MessageDashboardComponent,
  SettingsDashboardComponent,
  PersonalInformationComponent,
  AllergicDiseasesComponent,
  HospitalTreatmentComponent,
  VaccinationsComponent,
  RecommendedVaccinationsComponent,
  ExtraVaccinationsComponent,
  AlertDashboardComponent,
  ModalContentComponent
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
