import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import ReservationModel from 'src/app/models/ReservationModel';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent {

  displayedColumns: string[] = ['id', 'startDate', 'actions'];
  appointments: ReservationModel[] = [];
  dataSource = new MatTableDataSource(this.appointments);

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getMyReservations()
    .subscribe({
      next: data => {
        this.appointments = data;
        this.dataSource.data = data;
      }
    })
  }
  isBeforeToday(date: Date) {
     const value = new Date() > new Date(date);
    return value;
  }

  cancelTerm(id: number) {
    if (confirm("Da li ste sigurni da zelite da otkazete termin?")) {
      this.reservationService.cancelReservation(id).subscribe({
        next: data => {
          this.appointments = this.appointments.filter(a => a.id !== +id);
          this.dataSource.data = this.appointments;
          alert("Otkazivanje uspesno sacuvano.")
        }, error: (err: HttpErrorResponse) => {
          alert("Otkazivanje nije uspelo")
        }
      })
    }
  }
}
