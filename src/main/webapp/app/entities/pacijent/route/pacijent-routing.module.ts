import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PacijentComponent } from '../list/pacijent.component';
import { PacijentDetailComponent } from '../detail/pacijent-detail.component';
import { PacijentUpdateComponent } from '../update/pacijent-update.component';
import { PacijentRoutingResolveService } from './pacijent-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pacijentRoute: Routes = [
  {
    path: '',
    component: PacijentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PacijentDetailComponent,
    resolve: {
      pacijent: PacijentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PacijentUpdateComponent,
    resolve: {
      pacijent: PacijentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PacijentUpdateComponent,
    resolve: {
      pacijent: PacijentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pacijentRoute)],
  exports: [RouterModule],
})
export class PacijentRoutingModule {}
