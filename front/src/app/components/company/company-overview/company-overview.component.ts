import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SingleCompany from 'src/app/payload/responses/company/SingleCompany';
import SingleEquipment from 'src/app/payload/responses/equipment/SingleEquipment';
import SingleTerm from 'src/app/payload/responses/terms/SingleTerm';
import { CompanyService } from 'src/app/services/company.service';
import { EqipmentService } from 'src/app/services/eqipment.service';
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

  displayedColumns: string[] = ['id', 'name', 'tag'];
  equipment: SingleEquipment[] = [];
  dataSource = new MatTableDataSource(this.equipment);


  constructor(private companyService: CompanyService,
    private equipmentService: EqipmentService,
    private activatedRoute: ActivatedRoute,
    private temrsService: TermsService,
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
        this.equipment = data;
        this.dataSource = new MatTableDataSource(this.equipment);
      }
    })

    this.temrsService.getListByCompanyId(this.companyId).subscribe({
      next: data => {
        this.availableTerms=data;
      }
    })
  }

  confirmReservation() {
    console.log('JAISJDIAS')
  }
}
