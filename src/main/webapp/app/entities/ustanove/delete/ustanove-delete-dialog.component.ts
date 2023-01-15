import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUstanove } from '../ustanove.model';
import { UstanoveService } from '../service/ustanove.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ustanove-delete-dialog.component.html',
})
export class UstanoveDeleteDialogComponent {
  ustanove?: IUstanove;

  constructor(protected ustanoveService: UstanoveService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ustanoveService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
