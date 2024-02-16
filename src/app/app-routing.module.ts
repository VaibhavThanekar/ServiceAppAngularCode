import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { CustomerServiceDetailsComponent } from './customer-service/customer-service-details.component';
import { LoginComponent } from './login/login.component';
import { ServiceChargeComponent } from './customer-service/service-charge.component';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';
import { CustomerSalesDetailsComponent } from './customer-sales/customer-sales-details.component';

const routes: Routes = [
{path:'Login', component:LoginComponent},
{path:'Dashboard', component:DashboardComponent},
{path:'Product', component:ProductComponent},
{path:'CustomerSales', component:CustomerSalesComponent},
{path:'CustomerSalesDetails', component:CustomerSalesDetailsComponent},
{path:'CustomerService', component:CustomerServiceComponent},
{path:'CustomerServiceDetails', component:CustomerServiceDetailsComponent},
{path:'ServiceCharge', component:ServiceChargeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
