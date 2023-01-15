import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UstanoveComponent } from './list/ustanove.component';
import { UstanoveDetailComponent } from './detail/ustanove-detail.component';
import { UstanoveUpdateComponent } from './update/ustanove-update.component';
import { UstanoveDeleteDialogComponent } from './delete/ustanove-delete-dialog.component';
import { UstanoveRoutingModule } from './route/ustanove-routing.module';

@NgModule({
  imports: [SharedModule, UstanoveRoutingModule],
  declarations: [UstanoveComponent, UstanoveDetailComponent, UstanoveUpdateComponent, UstanoveDeleteDialogComponent],
})
export class UstanoveModule {}
