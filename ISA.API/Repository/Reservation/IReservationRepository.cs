﻿using ISA.API.Data.Entities;

namespace ISA.API.Repository.Reservation;

public interface IReservationRepository
{
    Task<ReservationEntity> Create(ReservationEntity entity);
    Task<ReservationItemEntity> CreateItem(ReservationItemEntity entity);
    Task<ReservationEntity?> GetByIdAsync(int reservationId);
    Task<IEnumerable<ReservationEntity>> GetListByUserIdAsync(string userId);
}
