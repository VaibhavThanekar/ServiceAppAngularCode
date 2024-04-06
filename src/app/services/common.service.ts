import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../models/commonMaster';
import { Settings, SettingsDetails } from '../models/settings';
import { DashboardDetails } from '../models/dashboardDetails';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  token:any;
  closeModal = new BehaviorSubject<boolean>(false);
  isModalClosed$ =this.closeModal.asObservable()
  
  readonly apiWAURL = Constants.BASE_URL + "WAMessages/";
  readonly settingsURL = Constants.BASE_URL + "CommonMaster/";
  constructor(private http:HttpClient) { }

  updateModal(isClose:boolean)
  {
    this.closeModal.next(isClose);
  }

  getToken(){
    if(typeof localStorage !== 'undefined'  && localStorage.getItem('login') == 'Success'){
      this.token = localStorage.getItem('token');
      // console.log(this.token);
      return this.token!==null?this.token:null;
    }
    return this.token;
  }

  SendMessageToCustomer(department:string,  id:number, name:string, mobile:string, amount:string){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
    return this.http.post(this.apiWAURL+"SendMessageToCustomer?department="+department+"&id="+id+"&name="+name+"&mobile="+mobile+"&amount="+amount, headers);
  }

  getAllSettingDetails(){
    return this.http.get<SettingsDetails[]>(this.settingsURL + "GetAllSettingDetails");
   }

   updateSetting(settings:Settings){
    return this.http.post(this.settingsURL+"UpdateSetting", settings);
  }

  getDashboardDetails(){
    return this.http.get<DashboardDetails[]>(this.settingsURL + "GetDashboardDetails");
   }
}
