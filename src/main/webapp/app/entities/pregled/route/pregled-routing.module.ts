import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PregledComponent } from '../list/pregled.component';
import { PregledDetailComponent } from '../detail/pregled-detail.component';
import { PregledUpdateComponent } from '../update/pregled-update.component';
import { PregledRoutingResolveService } from './pregled-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pregledRoute: Routes = [
  {
    path: '',
    component: PregledComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PregledDetailComponent,
    resolve: {
      pregled: PregledRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PregledUpdateComponent,
    resolve: {
      pregled: PregledRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PregledUpdateComponent,
    resolve: {
      pregled: PregledRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pregledRoute)],
  exports: [RouterModule],
})
export class PregledRoutingModule {}
