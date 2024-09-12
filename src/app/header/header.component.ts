import { Component, ElementRef } from '@angular/core';
import { ReminderMaster } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { SidebarComponent } from '../sidebar/sidebar.component';


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
showMyClass = false;



constructor(private formBuilder: FormBuilder, private reminderService:ReminderService, 
  private commonService:CommonService, private router:Router, private el: ElementRef){}
  ngOnInit() {
    // this.commonService.btnToggle.next(false);
  this.commonService.isModalClosed$.subscribe(data => {
    this.showChild = data;
  })
  
  if(typeof localStorage !== 'undefined') 
  {
  this.userName = localStorage.getItem('userName');
  }
  
  this.getAllRemindersForToday();
}

getAllRemindersForToday(){
  this.reminderService.getAllRemindersForToday().subscribe(data =>{
    this.todaysReminder = data;
    this.reminderCount = data.length;
  })
}

  openModal(id: any, dept:string) 
  {
    localStorage.setItem('reminderId',id)
    localStorage.setItem('deptModal', dept)
    localStorage.setItem('isNoted', '1')
    this.showChild = true;
  }


  logout():void
  {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
  }

  hideShowSidebar():void{
    this.showMyClass = !this.showMyClass;
    this.commonService.btnToggle.next(this.showMyClass);
  }
}
