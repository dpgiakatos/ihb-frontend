import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, switchMap, map } from 'rxjs/operators';
import { of, Observable, merge } from 'rxjs';
import { AuthService, Role, Claims } from '../../auth/auth.service';
import { PersonalInformationService } from './personal-information/personal-information.service';
import { RecommendedVaccinationsService } from './vaccinations/recommended-vaccinations/recommended-vaccinations.service';
import { ExtraVaccinationsService } from './vaccinations/extra-vaccinations/extra-vaccinations.service';
import { AllergicDiseasesService } from './allergic-diseases/allergic-diseases.service';
import { HospitalTreatmentsService } from './hospital-treatment/hospital-treatment.service';

export const isDoctorFactory = (authService: AuthService) => authService.getClaims()?.roles.some(r => r === Role.Doctor) || false;
export const claimsFactory = (authService: AuthService) => authService.getClaims();

export const IS_DOCTOR = 'is_doctor';

@Component({
  selector: 'ihb-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [
    PersonalInformationService,
    RecommendedVaccinationsService,
    ExtraVaccinationsService,
    AllergicDiseasesService,
    HospitalTreatmentsService,
    {
      provide: IS_DOCTOR,
      useFactory: isDoctorFactory,
      deps: [AuthService]
    },
    {
      provide: Claims,
      useFactory: claimsFactory,
      deps: [AuthService]
    }
  ]
})
export class UserDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  activatedChild: Observable<string | null>;

  ngOnInit() {
    this.activatedChild = merge(
      of(this.route.snapshot.firstChild?.url || []).pipe(
        map((urlSegments) => {
          if (urlSegments.length) {
            return urlSegments[0].path;
          }
          return null;
        })
      ),
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => (this.route.firstChild?.url || of([]))),
        map((urlSegments) => {
          if (urlSegments.length) {
            return urlSegments[0].path;
          }
          return null;
        })
      )
    );
  }
}
