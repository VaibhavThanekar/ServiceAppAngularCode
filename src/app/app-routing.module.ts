import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { CustomerServiceDetailsComponent } from './customer-service/customer-service-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{path:'login', component:LoginComponent},
{path:'dashboard', component:DashboardComponent},
{path:'product', component:ProductComponent},
{path:'CustomerService', component:CustomerServiceComponent},
{path:'CustomerServiceDetails', component:CustomerServiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
