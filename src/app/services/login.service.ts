import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMaster } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly apiURL = "http://localhost:5153/api/UserMaster/";
  constructor(private http:HttpClient) { }

  // http://localhost:5153/api/UserMaster/GetUserDetailsForLogin?emailId=thanekarvaibhav%40gmail.com&password=Vaibhav%4059
  
  getUserDetailsForLogin(emailId:string, password:string){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<UserMaster[]>(this.apiURL+"GetUserDetailsForLogin?emailId="+emailId + "&password=" + password);
  }
}
