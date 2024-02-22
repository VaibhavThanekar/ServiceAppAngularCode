import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  closeModal = new BehaviorSubject<boolean>(false);
  isModalClosed$ =this.closeModal.asObservable()
  constructor() { }

  updateModal(isClose:boolean)
  {
    this.closeModal.next(isClose);
  }
}
