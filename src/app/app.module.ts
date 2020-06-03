import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ScrollTopComponent } from './home-page/scroll-top/scroll-top.component';

import { FooterComponent } from './home-page/footer/footer.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SharedModule } from './shared/shared.module';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { environment } from '../environments/environment';
import { NgbPlainDateAdapter } from './helper/date-adapter.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { PreventAuthGuard } from './auth/guards/prevent-auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canLoad: [PreventAuthGuard]},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard]},
  {path: '**', component: NotFoundPageComponent}
];

export function tokenGetter() {
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: NgbPlainDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
