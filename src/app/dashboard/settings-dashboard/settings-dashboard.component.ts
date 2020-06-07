import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'ihb-settings-dashboard',
  templateUrl: './settings-dashboard.component.html',
  styleUrls: ['./settings-dashboard.component.css'],
  providers: [SettingsService]
})
export class SettingsDashboardComponent implements OnInit {

  passwordForm = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    retype: new FormControl(null, [Validators.required])
  });
  uploadForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });

  file: File;
  applicationActive: boolean;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.hasApplication();
  }

  onPasswordSubmit() {
    this.passwordForm.reset();
  }

  isNotSamePassword(): boolean {
    return Boolean(
      this.passwordForm.get('password')?.value !== this.passwordForm.get('retype')?.value && this.passwordForm.get('retype')?.touched
    );
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        if ((/\.(zip)$/i).test(file.name) && file.size <= 50000000) {
          this.file = file;
        } else {
          // TODO: handle error
        }
      }
    }
  }

  onUploadSubmit() {
    this.settingsService.post(this.file).subscribe(() => { this.hasApplication(); });
  }

  hasApplication() {
    this.settingsService.get().subscribe(value => { this.applicationActive = value; });
  }

  isInvalid(form: FormGroup): boolean {
    return form.invalid || this.isNotSamePassword();
  }
}
