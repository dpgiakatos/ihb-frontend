import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { DoctorDashboardComponent } from './dashboard/doctor-dashboard/doctor-dashboard.component';
import { AdministratorDashboardComponent } from './dashboard/administrator-dashboard/administrator-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ScrollTopComponent } from './home-page/scroll-top/scroll-top.component';
import { UserTabDashboardComponent } from './dashboard/user-tab-dashboard/user-tab-dashboard.component';
import { MessageDashboardComponent } from './dashboard/message-dashboard/message-dashboard.component';
import { SettingsDashboardComponent } from './dashboard/settings-dashboard/settings-dashboard.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SharedModule } from './shared/shared.module';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'user', component: UserDashboardComponent},
    {path: 'doctor', component: DoctorDashboardComponent},
    {path: 'administrator', component: AdministratorDashboardComponent},
    {path: 'message', component: MessageDashboardComponent},
    {path: 'usertab', component: UserTabDashboardComponent},
    {path: 'settings', component: SettingsDashboardComponent}
  ]},
  {path: '**', component: NotFoundPageComponent}
];

export function tokenGetter() {
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDashboardComponent,
    DoctorDashboardComponent,
    AdministratorDashboardComponent,
    UserTabDashboardComponent,
    MessageDashboardComponent,
    SettingsDashboardComponent,
    HomePageComponent,
    ScrollTopComponent,
    FooterComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 72]
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['http://localhost:3000']
      }
    })
  ],
  exports: [
    DoctorDashboardComponent
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
