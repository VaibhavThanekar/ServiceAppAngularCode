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
import { CustomerModalComponent } from './common/customer-modal.component';
import { ReminderComponent } from './reminder/reminder.component';
import { CustomerSalesReportComponent } from './reports/customer-sales-report.component';
import { CustomerServiceReportComponent } from './reports/customer-service-report.component';
import { UserComponent } from './user/user.component';
// import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { UserSettingComponent } from './user/user-setting.component';
import { PreviousReminderReportComponent } from './reports/previous-reminder-report.component';

const routes: Routes = [
// {path:'', redirectTo: '/Home', pathMatch: 'full'},
// {path:'Home',  component:HomeComponent},
{path:'Login', component:LoginComponent},
{path:'Dashboard', component:DashboardComponent},
{path:'Product', component:ProductComponent},
{path:'CustomerSales', component:CustomerSalesComponent},
{path:'CustomerSalesDetails', component:CustomerSalesDetailsComponent},
{path:'CustomerService', component:CustomerServiceComponent},
{path:'CustomerServiceDetails', component:CustomerServiceDetailsComponent},
{path:'ServiceCharge', component:ServiceChargeComponent},
{path:'CustomerModal', component:CustomerModalComponent},
{path:'Reminder', component:ReminderComponent},
{path:'User', component:UserComponent},
{path:'CustomerSalesReport', component:CustomerSalesReportComponent},
{path:'CustomerServiceReport', component:CustomerServiceReportComponent},
{path:'Settings', component:SettingsComponent},
{path:'UserSettings', component:UserSettingComponent},
{path:'PreviousReminderReport', component:PreviousReminderReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
