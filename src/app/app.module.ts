import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { AdministratorDashboardComponent } from './dashboard/administrator-dashboard/administrator-dashboard.component';
import { NotificationDashboardComponent } from './dashboard/notification-dashboard/notification-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomePageComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'notification', component: NotificationDashboardComponent},
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
    AdministratorDashboardComponent,
    NotificationDashboardComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    DoctorDashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
