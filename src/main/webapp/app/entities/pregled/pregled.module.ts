import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PregledComponent } from './list/pregled.component';
import { PregledDetailComponent } from './detail/pregled-detail.component';
import { PregledUpdateComponent } from './update/pregled-update.component';
import { PregledDeleteDialogComponent } from './delete/pregled-delete-dialog.component';
import { PregledRoutingModule } from './route/pregled-routing.module';

@NgModule({
  imports: [SharedModule, PregledRoutingModule],
  declarations: [PregledComponent, PregledDetailComponent, PregledUpdateComponent, PregledDeleteDialogComponent],
})
export class PregledModule {}
