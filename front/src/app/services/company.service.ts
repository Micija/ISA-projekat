import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SingleCompany from '../payload/responses/company/SingleCompany';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  getById(companyId: string) {
    return this.http.get<SingleCompany>(
      environment.backendBaseUrl + "Company/" + companyId);
  }

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<SingleCompany[]>(
      environment.backendBaseUrl + "Company");
  }

}
