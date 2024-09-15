import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMaster } from '../models/user';
import { ReminderMaster, ReminderMasterList } from '../models/reminder';
import { Constants } from '../models/commonMaster';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  readonly apiURL = Constants.BASE_URL + "ReminderMaster/";
  constructor(private http:HttpClient) { }

  getAllReminders(department:any, userId:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<ReminderMasterList[]>(this.apiURL+"GetAllReminders?department="+department+"&userId="+userId);
  }

  getAllRemindersForToday(department:any, userId:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.get<ReminderMaster[]>(this.apiURL+"GetAllRemindersForToday?department="+department+"&userId="+userId);
  }

  deActivateReminderFromId(id:number, modifiedBy:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return  this.http.post(this.apiURL+"DeActivateReminderFromId?id="+ id +"&modifiedBy="+modifiedBy,  headers);
  }
}
