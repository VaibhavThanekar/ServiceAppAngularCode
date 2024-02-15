import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {ServiceCharge} from '../models/service-charge'
import { json } from 'stream/consumers';
import { Constants } from '../models/commonMaster';

@Injectable({
  providedIn: 'root'
})
export class ServiceChargeService {

  readonly apiURL = Constants.BASE_URL + "ServiceCharge/";

  constructor(private http:HttpClient) { }

  getAllServiceCharges(){
   return this.http.get<ServiceCharge[]>(this.apiURL+"GetAllServiceCharges");
  }

  saveServiceCharge(serviceCharge:ServiceCharge){
    //alert("Hello");
    return this.http.post(this.apiURL+"AddServiceCharge", serviceCharge);
    
  }

  deleteServiceCharge(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
  //  return  this.http.delete(this.apiURL+"DeleteProduct?Id="+id);
  return  this.http.post(this.apiURL+"DeleteServiceCharge?Id="+ id,  headers);
  }


  updateServiceCharge(serviceCharge:ServiceCharge){
    return this.http.post(this.apiURL+"UpdateServiceCharge", serviceCharge);
  }
}
