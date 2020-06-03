import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtraVaccinationList, ExtraVaccination } from './extra-vaccinations.model';
import { UrlSerializerService } from '../../../../helper/url-serializer.service';
import { Claims } from '../../../../auth/auth.service';

@Injectable()
export class ExtraVaccinationsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService, private claims?: Claims) { }

  get(page: number, userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'extra-vaccinations']);
    return this.httpClient.get<ExtraVaccinationList>(url, { params: { page: page.toString() } });
  }

  create(vaccination: ExtraVaccination, userId?: string) {
    if (!userId) {
      userId = this.claims?.id; // @TODO what if he gets logged out while writing data?
    }
    const url = this.urlSerializer.serialize(['user', userId, 'extra-vaccinations']);
    return this.httpClient.post<ExtraVaccination>(url, vaccination);
  }

  edit(vaccinationId: string, vaccination: Partial<ExtraVaccination>) {
    return this.httpClient.put<ExtraVaccination>(`user/extra-vaccination/${vaccinationId}`, vaccination);
  }

  delete(vaccinationId: string) {
    return this.httpClient.delete<void>(`user/extra-vaccination/${vaccinationId}`);
  }
}
