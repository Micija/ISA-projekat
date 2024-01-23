import ReservationItem from "./ReservationItem";

export default interface Reservation {
    termId: number;
    reservationItems: ReservationItem[];
  }
  