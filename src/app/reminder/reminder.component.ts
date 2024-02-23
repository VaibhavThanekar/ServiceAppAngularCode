import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReminderMaster } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  reminderDetails!: FormGroup;
  dataSource!: MatTableDataSource<ReminderMaster>;
  allReminders: any = [];
  posts: any;
  showChild=false;

  public displayedColumns: string[] = ['actions', 'description', 'department', 'reminderDateTime', 'isActive',];

  constructor(private reminderService:ReminderService,private commonService:CommonService){}

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {

    this.commonService.isModalClosed$.subscribe(data => {
      this.showChild = data;
    })

    this.getAllRemindersForToday();
  }

  selectedItem(id: any, dept:string, isNoted:any) {
    localStorage.setItem('id',id)
    localStorage.setItem('deptModal',dept)
    localStorage.setItem('isNoted',isNoted)
    console.log('isNoted', isNoted)
    this.showChild = true;

  }

  getAllRemindersForToday(){
    this.reminderService.getAllReminders().subscribe(data =>{
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
