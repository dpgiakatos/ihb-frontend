import { NgModule } from '@angular/core';
import { AuthService, Role } from './auth.service';

export const IS_DOCTOR = 'is_doctor';

@NgModule({
  providers: [
    { provide: Role, useFactory: (authService: AuthService) => authService.getClaims()?.roles, deps: [AuthService] },
    {
      provide: IS_DOCTOR,
      useFactory: (authService: AuthService) => authService.getClaims()?.roles.some(r => r === Role.Doctor) || false,
      deps: [AuthService]
    }
  ]
})
export class AuthUtilitiesModule {

}
