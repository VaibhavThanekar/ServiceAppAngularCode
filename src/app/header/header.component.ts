import { Component } from '@angular/core';
import { ReminderMaster } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
userName:any;
public todaysReminder:ReminderMaster[] = [];
reminderCount:number=0;
showChild=false;


constructor(private formBuilder: FormBuilder, private reminderService:ReminderService, private commonService:CommonService){}
ngOnInit() {
  this.commonService.isModalClosed$.subscribe(data => {
    this.showChild = data;
    console.log("data", data)
  })

  this.userName = 'Vaibhav';
  // this.userName = sessionStorage.getItem('userName');
 
  // this.userName =  sessionStorage.getItem('userName')?.toString();
  // console.log(this.userName.toString());
  // alert(this.userName);

  this.getAllRemindersForToday();
}

getAllRemindersForToday(){
  this.reminderService.getAllRemindersForToday().subscribe(data =>{
    this.todaysReminder = data;
    this.reminderCount = data.length;
  })
}

  openSalesModal(id: any) 
  {
    localStorage.setItem('id',id)
    this.showChild = true;
  }
}
