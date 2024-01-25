import { Injectable } from '@angular/core';
import Reservation from '../payload/requests/reservation/Reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import ReservationModel from '../models/ReservationModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation) {
    return this.http.post<any>(
      environment.backendBaseUrl + "Reservation/", reservation);
  }

  getMyReservations() {
    return this.http.get<ReservationModel[]>(
      environment.backendBaseUrl + "Reservation/My");
  }

  cancelReservation(id: number) {
    return this.http.post<any>(
      environment.backendBaseUrl + "Reservation/Cancel", {reservationId: id});
  }
}
