import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  // standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole:any;
  department:any;
  constructor(){ }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      this.userRole =  localStorage.getItem('role');
      this.department =  localStorage.getItem('department');
    }    
  }
}
