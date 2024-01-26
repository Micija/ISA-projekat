import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import EquipmentItem from 'src/app/models/EquipmentItem';
import Reservation from 'src/app/payload/requests/reservation/Reservation';
import SingleCompany from 'src/app/payload/responses/company/SingleCompany';
import SingleEquipment from 'src/app/payload/responses/equipment/SingleEquipment';
import SingleTerm from 'src/app/payload/responses/terms/SingleTerm';
import { CompanyService } from 'src/app/services/company.service';
import { EqipmentService } from 'src/app/services/eqipment.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TermsService } from 'src/app/services/terms.service';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit {

  companyId: string = "";
  company?: SingleCompany;
  availableTerms: SingleTerm[] = [];
  selectedTerm: number = 0;

  displayedColumns: string[] = ['id', 'name', 'tag', 'availableQuantity', 'actions'];
  equipment: EquipmentItem[] = [];
  dataSource = new MatTableDataSource(this.equipment);


  constructor(private companyService: CompanyService,
    private equipmentService: EqipmentService,
    private activatedRoute: ActivatedRoute,
    private temrsService: TermsService,
    private reservationService: ReservationService,
    private toastr: ToastrService) {
      this.activatedRoute.params.subscribe({
        next: data => {
          this.companyId = data['id'];
        }
      });
    }

  ngOnInit(): void {
    this.companyService.getById(this.companyId)
    .subscribe({
      next: data => {
        this.company = data;
      }
    })

    this.equipmentService.getListByCompanyId(this.companyId)
    .subscribe({
      next: data => {
        this.equipment = data.map(e => {
          return {
            id: e.id,
            name: e.name,
            tag: e.tag,
            availableQuantity: e.availableQuantity,
            selectedQuantity: 0
          }
        });

        this.dataSource = new MatTableDataSource(this.equipment);
      }
    })

    this.temrsService.getListByCompanyId(this.companyId).subscribe({
      next: data => {
        this.availableTerms=data;
      }
    })
  }

  decrease(id: number) {
    const equipment = this.equipment.find( e=> e.id === id);
    if (equipment && equipment.selectedQuantity > 0) {
      equipment.selectedQuantity--;
    }
  }

  increase(id: number) {
    const equipment = this.equipment.find( e=> e.id === id);
    if (equipment && equipment.selectedQuantity < equipment.availableQuantity) {
      equipment.selectedQuantity++;
    }
  }

  confirmReservation() {
    const items = this.equipment.filter(e => e.selectedQuantity != 0);
    console.log(items);
    const reservation: Reservation = {
      termId: this.selectedTerm,
      reservationItems: items.map(e => {
          return {
            equipmentId: e.id,
            quantity: e.selectedQuantity
          }
        })
    }

    this.reservationService.createReservation(reservation)
    .subscribe({
      next: data => {
        alert('Rezervacija uspesno sacuvana')
        this.temrsService.getListByCompanyId(this.companyId).subscribe({
          next: data => {
            this.availableTerms=data;
            this.equipmentService.getListByCompanyId(this.companyId)
              .subscribe({
                next: data => {
                  this.equipment = data.map(e => {
                    return {
                      id: e.id,
                      name: e.name,
                      tag: e.tag,
                      availableQuantity: e.availableQuantity,
                      selectedQuantity: 0
                    }
                  });
                }
              });
          }
        })
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error);
      }
    })

  }
}
