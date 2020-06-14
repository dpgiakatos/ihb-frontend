import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RecommendedVaccines } from './recommended-vaccines.model';
import { UrlSerializerService } from '../../../../helper/url-serializer.service';
import { Claims } from '../../../../auth/auth.service';

@Injectable()
export class RecommendedVaccinationsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService, private claims?: Claims) { }

  get(userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'vaccinations']);

    return forkJoin({
      recommendedVaccines: this.httpClient.get<RecommendedVaccines[]>('user/vaccines'),
      userVaccinations: this.httpClient.get<RecommendedVaccines[]>(url)
    });
  }

  edit(vaccinations: { [vaccineId: string]: boolean }, userId?: string) {
    if (!userId) {
      userId = this.claims?.id; // @TODO what if he gets logged out while writing data?
    }
    const url = this.urlSerializer.serialize(['user', userId, 'vaccinations']);
    return this.httpClient.put(url, vaccinations);
  }
}
