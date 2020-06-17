import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ControlValidationStateDirective } from './control-validation-state.directive';
import { ProvideNgFormDirective } from './provide-ng-form.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ControlValidationStateDirective,
    ProvideNgFormDirective,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    ControlValidationStateDirective,
    ProvideNgFormDirective,
    LanguageSelectorComponent
  ]
})
export class SharedModule { }
