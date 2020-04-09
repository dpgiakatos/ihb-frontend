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
import { ScrollTopComponent } from './home-page/scroll-top/scroll-top.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserTabDashboardComponent } from './dashboard/user-tab-dashboard/user-tab-dashboard.component';
import { MessageDashboardComponent } from './dashboard/message-dashboard/message-dashboard.component';
import { SettingsDashboardComponent } from './dashboard/settings-dashboard/settings-dashboard.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'auth', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'notification', component: NotificationDashboardComponent},
    {path: 'user', component: UserDashboardComponent},
    {path: 'doctor', component: DoctorDashboardComponent},
    {path: 'administrator', component: AdministratorDashboardComponent},
    {path: 'message', component: MessageDashboardComponent},
    {path: 'usertab', component: UserTabDashboardComponent},
    {path: 'settings', component: SettingsDashboardComponent}
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
    UserTabDashboardComponent,
    MessageDashboardComponent,
    SettingsDashboardComponent,
    HomePageComponent,
    ScrollTopComponent,
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
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
