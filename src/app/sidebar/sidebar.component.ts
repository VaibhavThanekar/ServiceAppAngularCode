import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidebar',
  // standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole:any;
  department:any;
  showSideBar=false;

  constructor(private commonService:CommonService){
    this.commonService.btnToggle.subscribe((val:any) => {
      this.showSideBar = val; 
    })
   }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      this.userRole =  localStorage.getItem('role');
      this.department =  localStorage.getItem('department');
    } 
    }
}
