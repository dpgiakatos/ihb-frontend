import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { Claims } from '../../../auth/auth.service';
import { AllergicDiseasesList, AllergicDiseases } from './allergic-diseases.model';

@Injectable()
export class AllergicDiseasesService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService, private claims?: Claims) { }

  get(page: number, userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'allergic']);
    return this.httpClient.get<AllergicDiseasesList>(url, { params: { page: page.toString() } });
  }

  create(allergic: AllergicDiseases, userId?: string) {
    if (!userId) {
      userId = this.claims?.id; // @TODO what if he gets logged out while writing data?
    }
    const url = this.urlSerializer.serialize(['user', userId, 'allergic']);
    return this.httpClient.post<AllergicDiseases>(url, allergic);
  }

  edit(allergicId: string, allergic: Partial<AllergicDiseases>) {
    return this.httpClient.put<AllergicDiseases>(`user/allergic/${allergicId}`, allergic);
  }

  delete(allergicId: string) {
    return this.httpClient.delete<void>(`user/allergic/${allergicId}`);
  }
}
