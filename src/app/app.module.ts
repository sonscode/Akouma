import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdmissionComponent } from './admission/admission.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactService } from './contact.service';
import { Form3Component } from './form3/form3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule, MatPrefix } from "@angular/material/form-field";
// import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Dialog2Component } from './dialog2/dialog2.component';
import { FooterComponent } from './footer/footer.component';
import { Form4Component } from './form4/form4.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthApiService } from './services/auth-api.service';
import { ApiService } from './services/api.service';
import { MarksApiService } from './services/marks-api.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { Dialog3Component } from './dialog3/dialog3.component';
import { Dialog4Component } from './dialog4/dialog4.component';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';

import { ReportsComponent } from './reports/reports.component';
import { ReportDataComponent } from './report-data/report-data.component';
import { ActionsComponent } from './actions/actions.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdmissionComponent,
    GalleryComponent,
    BlogComponent,
    ContactComponent,
    PageNotFoundComponent,
    Form3Component,
    DialogComponent,
    Dialog2Component,
    FooterComponent,
    Form4Component,
    RegisterComponent,
    LoginComponent,
    Dialog3Component,
    Dialog4Component,
    ReportsComponent,
    ReportDataComponent,
    ActionsComponent,
    EnrollmentComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SocialLoginModule

  ],
  providers: [
    Title,
    ContactService,
    AuthApiService,
    ApiService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('443350484173-ilpfjv3727msuclnf18h3n8oaapi67vj.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
