import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { UserDepartment, UserMaster, UserMasterDetails, UserRole} from '../models/user'
import { json } from 'stream/consumers';
import { Constants } from '../models/commonMaster';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUserURL = Constants.BASE_URL + "UserMaster/";

  constructor(private http:HttpClient) { }

  getAllUserDetails(){
    return this.http.get<UserMasterDetails[]>(this.apiUserURL+"GetAllUserDetails");
   }

  getAllUserDepatments(){
    return this.http.get<UserDepartment[]>(this.apiUserURL+"GetAllUserDepatments");
   }

   getAllUserRoles(){
    return this.http.get<UserRole[]>(this.apiUserURL+"GetAllUserRoles");
   }

  saveUser(userMaster:UserMaster){
    return this.http.post(this.apiUserURL+"AddUser", userMaster);
  }

  updateUser(userMaster:UserMaster){
    return this.http.post(this.apiUserURL+"UpdateUser", userMaster);
  }

  deleteUser(id:number, modifiedBy:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return  this.http.post(this.apiUserURL+"DeleteUser?Id="+ id + "&modifiedBy=" + modifiedBy,  headers);
  }
}
