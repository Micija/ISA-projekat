import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import ComplaintModel from 'src/app/models/ComplaintModel';
import ComplaintResponseModel from 'src/app/models/ComplaintResponseModel';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.component.html',
  styleUrls: ['./my-complaints.component.css']
})
export class MyComplaintsComponent {

  displayedColumns: string[] = ['id', 'companyName', 'date', 'text', 'answer'];
  complaints: ComplaintResponseModel[] = [];
  dataSource = new MatTableDataSource(this.complaints);

  modalTitle = ''
  complaintModalText? = ''

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaintService.getMyComplaints()
    .subscribe({
      next: data => {
        this.complaints = data;
        this.dataSource.data = data;
      }
    })
  }

  showComplaintText(id: number) {
    this.modalTitle = 'Tekst zalbe';
    const complaint = this.complaints.find(e => e.id === id)
    this.complaintModalText = complaint?.text;
  }

  shouldShowAnswerButton(answer?: string) {
    return !!answer;
  }

  showAnswer(id: number) {
    this.modalTitle = 'Odgovor na zalbu';
    const complaint = this.complaints.find(e => e.id === id)
    this.complaintModalText = complaint?.answer;
  }
  
}
