import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {Customer, CustomerNames} from '../models/customer'
import {Constants} from '../models/commonMaster'
import {ServicePersonList, ServiceChargeList, CurrentStatusList, CustomerService, CustomerServiceDetails, CustomerServiceQutationUpload} from '../models/customer-service'
import { json } from 'stream/consumers';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  readonly customerApiURL =  Constants.BASE_URL + "Customer/";
  readonly customerServiceApiURL = Constants.BASE_URL + "CustomerService/";

  constructor(private http:HttpClient) { }

  getAllCustomerNames(){
    return this.http.get<CustomerNames[]>(this.customerApiURL+"GetAllCustomerNames");
  }

  getServicePersons(){
    return this.http.get<ServicePersonList[]>(this.customerServiceApiURL+"GetServicePersons");
  }

  getServiceCharges(){
    return this.http.get<ServiceChargeList[]>(this.customerServiceApiURL+"GetServiceCharges");
  }

  getCurrentStatus(){
    return this.http.get<CurrentStatusList[]>(this.customerServiceApiURL+"GetCurrentStatus");
  }

  uploadServiceQuation(formData:any){
    return this.http.post<CustomerServiceQutationUpload[]>(this.customerServiceApiURL+"UploadServiceQuation", formData);
  }

  downloadServiceQuation(customerName:string, fileName:string, sourcePath:string){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<string>(this.customerServiceApiURL+"DownloadServiceQuation?customerName="+customerName+"&fileName="+fileName+"&sourcePath="+sourcePath);
  }

  getAllCustomerServiceDetails(department:any, userId:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<CustomerServiceDetails[]>(this.customerServiceApiURL+"GetAllCustomerServiceDetails?department="+department+"&userId="+userId);
  }

  saveCustomerService(customerService:CustomerService){
    //alert("Hello");
    return this.http.post(this.customerServiceApiURL+"AddCustomerService", customerService);
  }

  getCustomerServiceDetailsReport(fromDate:string, toDate:string, servicePersonId?:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<CustomerServiceDetails[]>(this.customerServiceApiURL+"GetCustomerServiceDetailsReport?FromDate=" + fromDate +
    '&ToDate='+ toDate +'&ServicePersonId='+ servicePersonId);
  }

  updateCustomerService(customerService:CustomerService){
    return this.http.post(this.customerServiceApiURL+"UpdateCustomerService", customerService);
  }
  
  // getAllCustomerNames():Observable<CustomerNames[]>{
  //   return this.http.get<CustomerNames[]>(this.apiURL+"GetAllCustomerNames");
  //  }

  //  getRisks(): Observable<CustomerNames[]> {
  //   return this.http.get(this.apiURL+"GetAllCustomerNames").pipe(
  //      map(this.extractData)
  //      .catch(this.handleError));
  // }


  // getPosts(){
  //   this.http.get('http://jsonplaceholder.typicode.com/posts')
  //   .pipe(map(res => res.json()));
  //   }
  //   }
   
//    getRisks(): Observable<CustomerNames[]> {
//     return this.http.get(this.apiURL+"GetAllCustomerNames").pipe(map(header => new HttpHeaders(header)))
//         // .map(this.extractData())
//         // .catch(this.handleError());
// }



}
