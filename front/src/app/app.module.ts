import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import  {MatInputModule } from '@angular/material/input';
import  {MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor, authInterceptorProviders } from './interceptors/auth.interceptor';
import { IndexComponent } from './components/index/index.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyOverviewComponent } from './components/company/company-overview/company-overview.component';
import { MyReservationsComponent } from './components/reservation/my-reservations/my-reservations.component';
import { ComposeComplaintComponent } from './components/complaint/compose-complaint/compose-complaint.component';
import { MyComplaintsComponent } from './components/complaint/my-complaints/my-complaints.component';
import { AdminComplaintsComponent } from './components/complaint/admin-complaints/admin-complaints.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    LoginComponent,
    IndexComponent,
    CompanyListComponent,
    CompanyOverviewComponent,
    MyReservationsComponent,
    ComposeComplaintComponent,
    MyComplaintsComponent,
    AdminComplaintsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
