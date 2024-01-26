import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import UserBasicInfoResponse from '../payload/responses/user-basic-info.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<UserBasicInfoResponse[]>(environment.backendBaseUrl + "employees");
  }

}
