import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyOverviewComponent } from './components/company/company-overview/company-overview.component';
import { MyReservationsComponent } from './components/reservation/my-reservations/my-reservations.component';
import { ComposeComplaintComponent } from './components/complaint/compose-complaint/compose-complaint.component';
import { MyComplaintsComponent } from './components/complaint/my-complaints/my-complaints.component';
import { AdminComplaintsComponent } from './components/complaint/admin-complaints/admin-complaints.component';

const routes: Routes = [
  {
    path: 'company/:id',
    component: CompanyOverviewComponent,
    pathMatch: 'full',
  },
  {
    path: 'company',
    component: CompanyListComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-reservations',
    component: MyReservationsComponent,
    pathMatch: 'full',
  },
  {
    path: 'compose-complaint',
    component: ComposeComplaintComponent,
    pathMatch: 'full',
  },
  {
    path: 'my-complaints',
    component: MyComplaintsComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-complaints',
    component: AdminComplaintsComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
