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

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesService {
  readonly productApiURL = Constants.BASE_URL + "ProductMaster/";
  readonly customerServiceApiURL = Constants.BASE_URL + "CustomerService/";
  readonly userApiURL = Constants.BASE_URL + "UserMaster/";
  readonly commonApiURL = Constants.BASE_URL + "CommonMaster/";

  constructor(private http:HttpClient) { }

  getServicePersons(){
    return this.http.get<ServicePersonList[]>(this.customerServiceApiURL+"GetServicePersons");
  }

  getAllProductNames(){
    return this.http.get<ProductNameList[]>(this.productApiURL + "GetAllProductNames");
   }

   getAllDurationList(){
    return this.http.get<DurationList[]>(this.commonApiURL + "GetAllDurationList");
   }

   getUserNamesFromDepartmentId(departmentId:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<UserName[]>(this.userApiURL+"GetUserNamesFromDepartmentId?departmentId=" + departmentId);
  }
}
