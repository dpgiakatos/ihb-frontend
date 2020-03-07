import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { AdministratorDashboardComponent } from './dashboard/administrator-dashboard/administrator-dashboard.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'user', component: UserDashboardComponent},
    {path: 'doctor', component: DoctorDashboardComponent},
    {path: 'administrator', component: AdministratorDashboardComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDashboardComponent,
    DoctorDashboardComponent,
    AdministratorDashboardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
