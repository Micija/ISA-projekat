import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import SingleCompany from 'src/app/payload/responses/company/SingleCompany';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'address'];
  companies: SingleCompany[] = [];
  dataSource = new MatTableDataSource(this.companies);

  constructor(private companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.companyService.getList().subscribe({
      next: data => {
        this.companies = data;
        this.dataSource.data = this.companies;
      },
      error: (err: HttpErrorResponse) => {

      }
    })
  }
}