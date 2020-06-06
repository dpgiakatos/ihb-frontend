import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PreventAuthGuard } from './guards/prevent-auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [PreventAuthGuard], children: [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
  ]}
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
