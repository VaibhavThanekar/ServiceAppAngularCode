import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductComponent } from './product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomerServiceService } from './services/customer-service.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CustomerServiceDetailsComponent } from './customer-service/customer-service-details.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceChargeComponent } from './customer-service/service-charge.component';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';
import { CustomerSalesService } from './services/customer-sales.service';
import { CustomerSalesDetailsComponent } from './customer-sales/customer-sales-details.component';
import { LocalStorageService } from 'ngx-webstorage';
import { ReminderService } from './services/reminder.service';
import { CustomerModalComponent } from './common/customer-modal.component';
import { ReminderComponent } from './reminder/reminder.component';
import { CustomerSalesReportComponent } from './reports/customer-sales-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateModule, DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './models/commonMaster';
import { CustomerServiceReportComponent } from './reports/customer-service-report.component';
import { tokenInterceptor } from './token.interceptor';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductComponent,
    CustomerServiceComponent,
    CustomerServiceDetailsComponent,
    LoginComponent,
    ServiceChargeComponent,
    CustomerSalesComponent,
    CustomerSalesDetailsComponent,
    CustomerModalComponent,
    ReminderComponent,
    CustomerSalesReportComponent,
    CustomerServiceReportComponent,
    // HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NativeDateModule,
    MatNativeDateModule,
    
  ],
  providers: [
    provideClientHydration(),
    ProductService,
    CustomerSalesService,
    CustomerServiceService,
    LocalStorageService,
    LoginService,
    ReminderService,
   { provide: MatFormFieldModule,useValue :{ appearance: 'fill' }},
  //  { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
