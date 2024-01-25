import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyOverviewComponent } from './components/company/company-overview/company-overview.component';
import { MyReservationsComponent } from './components/reservation/my-reservations/my-reservations.component';

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
