import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RecommendedVaccines } from './recommended-vaccines.interface';
import { UrlSerializerService } from 'src/app/helper/url-serializer.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendedVaccinationsService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService) { }

  get(userId?: string) {
    const url = this.urlSerializer.serialize(['user', userId, 'vaccinations']);

    return forkJoin({
      recommendedVaccines: this.httpClient.get<RecommendedVaccines[]>('user/vaccines'),
      userVaccinations: this.httpClient.get<RecommendedVaccines[]>(url) // @TODO: NO FUCKING WAY the type is correct
    });
  }

  edit(userId: string, vaccinations: any) { // @TODO WTF IS THIS ANY?????
    return this.httpClient.post(`user/${userId}/vaccinations`, vaccinations);
  }
}
