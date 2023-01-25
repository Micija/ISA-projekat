import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPacijent } from '../pacijent.model';
import { PacijentService } from '../service/pacijent.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './pacijent-delete-dialog.component.html',
})
export class PacijentDeleteDialogComponent {
  pacijent?: IPacijent;

  constructor(protected pacijentService: PacijentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pacijentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
