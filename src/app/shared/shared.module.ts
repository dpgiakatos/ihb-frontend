import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ControlValidationStateDirective } from './control-validation-state.directive';
import { ProvideNgFormDirective } from './provide-ng-form.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    ControlValidationStateDirective,
    ProvideNgFormDirective
  ],
  imports: [
    NgbCollapseModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ControlValidationStateDirective,
    ProvideNgFormDirective
  ]
})
export class SharedModule { }
