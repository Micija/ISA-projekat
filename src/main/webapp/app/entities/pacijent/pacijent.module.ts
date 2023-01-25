import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PacijentComponent } from './list/pacijent.component';
import { PacijentDetailComponent } from './detail/pacijent-detail.component';
import { PacijentUpdateComponent } from './update/pacijent-update.component';
import { PacijentDeleteDialogComponent } from './delete/pacijent-delete-dialog.component';
import { PacijentRoutingModule } from './route/pacijent-routing.module';

@NgModule({
  imports: [SharedModule, PacijentRoutingModule],
  declarations: [PacijentComponent, PacijentDetailComponent, PacijentUpdateComponent, PacijentDeleteDialogComponent],
})
export class PacijentModule {}
