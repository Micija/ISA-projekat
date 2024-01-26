import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-compose-complaint',
  templateUrl: './compose-complaint.component.html',
  styleUrls: ['./compose-complaint.component.css']
})
export class ComposeComplaintComponent {

  constructor(
    private companyService: CompanyService,
    private complaintService: ComplaintService ) {}

  selectedAdmin?: number;
  selectedCompany?: number;
  admins: any[] = [];
  companies: any[] = [];

  complaintText = "";

  ngOnInit(): void {

    this.companyService.getCompaniesForComplaint().subscribe({
      next: data => {
        this.companies = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log("Kompanije nisu ucitane")
      }
    })

  }

  saveComplaint() {
    if (!this.selectedCompany) {
      alert('Izaberite kompaniju')
      return;
    }

    this.complaintService.createComplaint({
      companyId: this.selectedCompany,
      text: this.complaintText
    }).subscribe({
      next: data => {
        alert('Zalba je sacuvana')
        this.selectedCompany = undefined;
        this.complaintText = ''
      },
      error: (err: HttpErrorResponse) => {
        alert('Zalba nije sacuvana')
      }
    })
  }
}
