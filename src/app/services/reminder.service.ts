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

  getAllReminders(){
    return this.http.get<ReminderMasterList[]>(this.apiURL+"GetAllReminders");
  }
  
  getAllRemindersForToday(){
    return this.http.get<ReminderMaster[]>(this.apiURL+"GetAllRemindersForToday");
  }

  deActivateReminderFromId(id:number, modifiedBy:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return  this.http.post(this.apiURL+"DeActivateReminderFromId?id="+ id +"&modifiedBy="+modifiedBy,  headers);
  }
}
