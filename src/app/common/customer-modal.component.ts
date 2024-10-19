import { Component, OnInit } from '@angular/core';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSalesDetails } from '../models/customer-sales';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css'
})
export class CustomerModalComponent {
  customerSalesForm!: FormGroup;
  salesDisplay = "none";
  allCustomers: any = []
  selectedID:any;
  selectedDept:any;
  isNoted:boolean=true;
  modifiedBy:number = 0;

  constructor(private customereSalesService: CustomerSalesService, private formBuilder: FormBuilder,
    private reminderService: ReminderService, private commonService:CommonService) {

    this.modifiedBy = Number(localStorage.getItem('userId'));
    
    this.customerSalesForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      salesPerson: [''],
      visitedDate: [''],
      timeOfVisit: [''],
      durationOfSale: [''],
      reminderDate: [''],
      product: [''],
      remark: [''],
      comment: ['']

    })
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.selectedID = Number(localStorage.getItem('reminderId'))
      this.selectedDept = localStorage.getItem('deptModal')
     
      if(Number(localStorage.getItem('isNoted')) == 0){
        this.isNoted = false;
      }
      else {this.isNoted = true;}
      
      if(this.selectedDept == 'Sales')
      {
        this.openSalesModal(this.selectedID);
      }
      else if(this.selectedDept == 'Service') 
      {
        return;
      }
     
    }
  }

  openSalesModal(id: number) {
    this.customereSalesService.getCustomerSaleDetailsFromID(id).subscribe(data => {
      this.allCustomers = data;

    this.customerSalesForm.patchValue({
      customerName: this.allCustomers[0]?.customerName,
      mobileNumber: this.allCustomers[0]?.mobileNumber,
      customerAddress: this.allCustomers[0]?.customerAddress,
      salesPerson: this.allCustomers[0]?.salesPerson,
      durationOfSale: this.allCustomers[0]?.durationOfSale,
      visitedDate:  this.allCustomers[0]?.visitedDate,
      timeOfVisit: this.allCustomers[0]?.timeOfVisit,
      reminderDate: this.allCustomers[0]?.reminderDate,
      product: this.allCustomers[0]?.product,
      remark: this.allCustomers[0]?.remark,
      comment: this.allCustomers[0]?.comment
    })
    })

    this.salesDisplay = "block";
  }

  onCloseHandled() {
    this.commonService.updateModal(false);
    this.salesDisplay = "none";
    localStorage.removeItem('reminderId')
    localStorage.removeItem('deptModal')
    localStorage.removeItem('isNoted')
    // localStorage.clear();
  }

  deactivateReminder(){
    this.reminderService.deActivateReminderFromId(this.selectedID, this.modifiedBy).subscribe(data => {
      var resultData = Object.values(data)[0];
      if(resultData = 'Reminder Updated Successfully !')
      {
        alert("Reminder disabled successfully..!");

      //  setTimeout(() => {
        localStorage.removeItem('reminderId');
        localStorage.removeItem('deptModal');
        localStorage.removeItem('isNoted');
        window.location.reload();
      // }, 1000);
      }
    })
  }
}
