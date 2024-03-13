import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  token:any;
  closeModal = new BehaviorSubject<boolean>(false);
  isModalClosed$ =this.closeModal.asObservable()
  constructor() { }

  updateModal(isClose:boolean)
  {
    this.closeModal.next(isClose);
  }

  getToken(){
    if(typeof localStorage !== 'undefined'  && localStorage.getItem('login') == 'Success'){
      this.token = localStorage.getItem('token');
      console.log(this.token);
      return this.token!==null?this.token:null;
    }
    return this.token;
  }
}
