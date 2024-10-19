import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReminderMaster, ReminderMasterList } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  reminderDetails!: FormGroup;
  dataSource!: MatTableDataSource<ReminderMasterList>;
  allReminders: any = [];
  posts: any;
  showChild=false;
  showAdditionalReminderChild=false;
  userRole:any;
  department:any;
  userName:any;
  userId:any;

  public displayedColumns: string[] = ['actions', 'customerName', 'description', 'department', 'visitedDate',
   'reminderDateTime', 'isActive', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate',];

  constructor(private reminderService:ReminderService,private commonService:CommonService){}

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    if (typeof localStorage !== 'undefined') {
      this.userRole =  localStorage.getItem('role');
      this.department =  localStorage.getItem('department');
      this.userName =  localStorage.getItem('userName');
      this.userId =  localStorage.getItem('userId');
    }   

    this.commonService.isModalClosed$.subscribe(data => {
      this.showChild = data;
    })

    this.commonService.isAdditionalReminderModalClosed$.subscribe(data => {
      this.showAdditionalReminderChild=data;
    })

    this.getAllRemindersForToday(this.department, this.userId);
  }

  selectedItem(id: any, dept:string, isNoted:any) {
    localStorage.setItem('reminderId',id)
    localStorage.setItem('deptModal',dept)
    localStorage.setItem('isNoted',isNoted)
    // console.log('isNoted', isNoted)
    this.showChild = true;
  }

  selectedAdditionalReminderItem(id: any, dept:string, isNoted:any) {
    localStorage.setItem('reminderIdAdditional',id)
    localStorage.setItem('deptModalAdditional',dept)
    // localStorage.setItem('isNoted',isNoted)
   
     this.showAdditionalReminderChild=true;
  }

  getAllRemindersForToday(department:any, userId:number){
    this.reminderService.getAllReminders(department, userId).subscribe(data =>{
    this.allReminders = data;
    this.posts = data;

    this.dataSource = new MatTableDataSource(this.posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
