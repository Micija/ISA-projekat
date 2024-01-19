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
import { VerificationSuccessfulComponent } from './components/verification-successful/verification-successful.component';
import { VerificationFailedComponent } from './components/verification-failed/verification-failed.component';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CenterDetailsComponent } from './components/center-details/center-details.component';
import { ToastrModule } from 'ngx-toastr';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { AuthInterceptor, authInterceptorProviders } from './interceptors/auth.interceptor';
import { ComplaintWritingComponent } from './components/complaint-writing/complaint-writing.component';
import { MyComplaintsComponent } from './components/my-complaints/my-complaints.component';
import { ComplaintAnswerComponent } from './components/complaint-answer/complaint-answer.component';
import { ComplaintsAdminComponent } from './components/complaints-admin/complaints-admin.component';
import { IndexComponent } from './components/index/index.component';
import { ReservedAppointmentsComponent } from './components/reserved-appointments/reserved-appointments.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    LoginComponent,
    VerificationSuccessfulComponent,
    VerificationFailedComponent,
    CenterDetailsComponent,
    QuestionnaireComponent,
    ComplaintWritingComponent,
    MyComplaintsComponent,
    ComplaintAnswerComponent,
    ComplaintsAdminComponent,
    IndexComponent,
    ReservedAppointmentsComponent,
    CompanyListComponent
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
