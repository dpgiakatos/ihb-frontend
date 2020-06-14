import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { Claims } from '../../../auth/auth.service';
import { HospitalTreatmentList, HospitalTreatment } from './hospital-treatment.model';

@Injectable()
export class HospitalTreatmentsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService, private claims?: Claims) { }

  get(page: number, userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'hospital-treatments']);
    return this.httpClient.get<HospitalTreatmentList>(url, { params: { page: page.toString() } });
  }

  create(treatment: HospitalTreatment, userId?: string) {
    if (!userId) {
      userId = this.claims?.id; // @TODO what if he gets logged out while writing data?
    }
    const url = this.urlSerializer.serialize(['user', userId, 'hospital-treatments']);
    return this.httpClient.post<HospitalTreatment>(url, treatment);
  }

  edit(treatmentId: string, treatment: Partial<HospitalTreatment>) {
    return this.httpClient.put<HospitalTreatment>(`user/hospital-treatment/${treatmentId}`, treatment);
  }

  delete(treatmentId: string) {
    return this.httpClient.delete<void>(`user/hospital-treatment/${treatmentId}`);
  }
}
