import { Component } from '@angular/core';
import { ReminderMaster } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
userName:any;
public todaysReminder:ReminderMaster[] = [];
reminderCount:number=0;

constructor(private reminderService:ReminderService){}

ngOnInit() {
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

}
