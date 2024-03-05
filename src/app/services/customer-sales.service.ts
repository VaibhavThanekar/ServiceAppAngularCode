import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {Customer, CustomerNames} from '../models/customer'
import {ServicePersonList} from '../models/customer-service'
import {ProductNameList} from '../models/product'
import {UserName} from '../models/user'
import {DurationList, Constants} from '../models/commonMaster'
import { json } from 'stream/consumers';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CustomerSales, CustomerSalesDetails, CustomerSalesDetailsReportParm } from '../models/customer-sales';

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesService {
  readonly productApiURL = Constants.BASE_URL + "ProductMaster/";
  readonly customerSalesApiURL = Constants.BASE_URL + "CustomerSales/";
  readonly userApiURL = Constants.BASE_URL + "UserMaster/";
  readonly commonApiURL = Constants.BASE_URL + "CommonMaster/";

  constructor(private http:HttpClient) { }

  getServicePersons(){
    return this.http.get<ServicePersonList[]>(this.customerSalesApiURL+"GetServicePersons");
  }

  getAllProductNames(){
    return this.http.get<ProductNameList[]>(this.productApiURL + "GetAllProductNames");
   }

   getAllDurationList(){
    return this.http.get<DurationList[]>(this.commonApiURL + "GetAllDurationList");
   }

   saveCustomerSales(customerSales:CustomerSales){
    return this.http.post(this.customerSalesApiURL+"AddCustomerSales", customerSales);
  }

  getAllCustomerSaleDetails(){
    return this.http.get<CustomerSalesDetails[]>(this.customerSalesApiURL+"GetAllCustomerSaleDetails");
  }

   getUserNamesFromDepartmentId(departmentId:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<UserName[]>(this.userApiURL+"GetUserNamesFromDepartmentId?departmentId=" + departmentId);
  }

  getCustomerSaleDetailsFromID(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<CustomerSalesDetails[]>(this.customerSalesApiURL+"GetCustomerSaleDetailsFromID?Id=" + id);
  }

  getCustomerSaleDetailsReport(fromDate:string, toDate:string, salesPersonId?:number, productId?:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<CustomerSalesDetails[]>(this.customerSalesApiURL+"GetCustomerSaleDetailsReport?FromDate=" + fromDate +
    '&ToDate='+ toDate +'&SalesPersonId='+ salesPersonId + '&ProductId=' + productId);
  }
}
