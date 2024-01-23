import { Injectable } from '@angular/core';
import SingleEquipment from '../payload/responses/equipment/SingleEquipment';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EqipmentService {

  constructor(private http: HttpClient) { }

  getListByCompanyId(companyId: string) {
    return this.http.get<SingleEquipment[]>(
      environment.backendBaseUrl + "Equipment/Company/" + companyId);
  }

}
