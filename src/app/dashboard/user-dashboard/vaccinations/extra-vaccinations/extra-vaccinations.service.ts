import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtraVaccinationList, ExtraVaccination } from './extra-vaccinations.interface';
import { UrlSerializerService } from 'src/app/helper/url-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraVaccinationsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(page: number, userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'extra-vaccinations']);
    return this.httpClient.get<ExtraVaccinationList>(url, { params: { page: page.toString() } });
  }

  create(userId: string, vaccination: ExtraVaccination) {
    return this.httpClient.post<ExtraVaccination>(`user/${userId}/extra-vaccinations`, vaccination);
  }

  edit(vaccinationId: string, vaccination: Partial<ExtraVaccination>) {
    return this.httpClient.put<ExtraVaccination>(`user/extra-vaccination/${vaccinationId}`, vaccination);
  }

  delete(vaccinationId: string) {
    return this.httpClient.delete<void>(`user/extra-vaccination/${vaccinationId}`);
  }
}
