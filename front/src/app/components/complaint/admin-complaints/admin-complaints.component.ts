import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import ComplaintResponseModel from 'src/app/models/ComplaintResponseModel';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-admin-complaints',
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent {

  displayedColumns: string[] = ['id', 'userName', 'companyName', 'date', 'text', 'answer'];
  complaints: ComplaintResponseModel[] = [];
  dataSource = new MatTableDataSource(this.complaints);

  modalTitle = ''
  complaintModalText? = ''
  answerAreaShown = false;
  complaintToAnswerTo?: number = undefined;
  answer = ''

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaintService.getComplaintsForAdmin()
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

  showAnswerArea(id: number) {
    this.complaintToAnswerTo = id;
    this.answerAreaShown = true;
  }
  
  saveAnswer() {
    this.complaintService.saveAnswer(this.complaintToAnswerTo!, this.answer)
    .subscribe({
      next: data => {
        this.complaintService.getComplaintsForAdmin()
    .subscribe({
      next: data => {
          alert('Uspesno sacuvano');
          this.answer = ''
          this.complaintToAnswerTo = undefined;
          this.answerAreaShown = false;
          this.complaints = data;
          this.dataSource.data = data;
        }
      })
      }
    })
  }

}
