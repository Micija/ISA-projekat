import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UstanoveComponent } from '../list/ustanove.component';
import { UstanoveDetailComponent } from '../detail/ustanove-detail.component';
import { UstanoveUpdateComponent } from '../update/ustanove-update.component';
import { UstanoveRoutingResolveService } from './ustanove-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ustanoveRoute: Routes = [
  {
    path: '',
    component: UstanoveComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UstanoveDetailComponent,
    resolve: {
      ustanove: UstanoveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UstanoveUpdateComponent,
    resolve: {
      ustanove: UstanoveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UstanoveUpdateComponent,
    resolve: {
      ustanove: UstanoveRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ustanoveRoute)],
  exports: [RouterModule],
})
export class UstanoveRoutingModule {}
