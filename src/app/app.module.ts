import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
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
    BrowserAnimationsModule,
    NgxSpinnerModule
  
  ],
  providers: [
    provideClientHydration(),
    ProductService,
    CustomerServiceService,
    LoginService,
   { provide: MatFormFieldModule,useValue :{ appearance: 'fill' }}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
