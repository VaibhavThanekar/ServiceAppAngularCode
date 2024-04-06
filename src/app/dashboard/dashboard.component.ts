import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DashboardDetails } from '../models/dashboardDetails';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: {ngSkipHydration: 'true'}
})
export class DashboardComponent {
  public dashboardDetails:DashboardDetails[] = [];

  constructor(private commonService: CommonService){
  }

  ngAfterViewInit() {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.commonService.getDashboardDetails().subscribe(data => {
      this.dashboardDetails = data;
    })
  }
}
