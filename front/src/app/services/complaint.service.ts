import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ComplaintModel from '../models/ComplaintModel';
import { environment } from 'src/environments/environment';
import ComplaintResponseModel from '../models/ComplaintResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  createComplaint(reservation: ComplaintModel) {
    return this.http.post<any>(
      environment.backendBaseUrl + "Complaint/", reservation);
  }

  
  getMyComplaints() {
    return this.http.get<ComplaintResponseModel[]>(
      environment.backendBaseUrl + "Complaint/My");
  }

  getComplaintsForAdmin() {
    return this.http.get<ComplaintResponseModel[]>(
      environment.backendBaseUrl + "Complaint/Admin");
  }

  saveAnswer(id: number, text: string) {
    return this.http.post<any>(
      environment.backendBaseUrl + "Complaint/Answer", {
        id,
        text
      });
  }
}
