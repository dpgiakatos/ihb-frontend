import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializerService } from '../../../helper/url-serializer.service';
import { Claims } from 'src/app/auth/auth.service';

@Injectable()
export class AllergicDiseasesService {

  constructor(private httpClient: HttpClient, private urlSerializer: UrlSerializerService, private claims?: Claims) { }

}
