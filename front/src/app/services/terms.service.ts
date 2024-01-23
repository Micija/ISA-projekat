import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SingleTerm from '../payload/responses/terms/SingleTerm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private http: HttpClient) { }

  getListByCompanyId(companyId: string) {
    return this.http.get<SingleTerm[]>(
      environment.backendBaseUrl + "Terms/Company/" + companyId);
  }
}
