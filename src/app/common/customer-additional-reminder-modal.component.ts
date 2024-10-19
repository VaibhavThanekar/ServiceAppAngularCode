import { Component, OnInit } from '@angular/core';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSalesDetails } from '../models/customer-sales';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ReminderService } from '../services/reminder.service';
import { AdditionalReminder, ReminderMaster, ReminderMasterList } from '../models/reminder';
import { DepartmentMaster } from '../models/departmentMaster';

@Component({
  selector: 'app-customer-additional-reminder-modal',
  templateUrl: './customer-additional-reminder-modal.component.html',
  styleUrl: './customer-additional-reminder-modal.component.css'
})
export class CustomerAdditionalReminderModalComponent {
  customerSalesFormAdditional!: FormGroup;
  salesAdditonalReminderDisplay = "none";
  allCustomers: any = []
  additionalSelectedID:any;
  additionalSelectedDept:any;
  createdBy:number = 0;
  customerId:number = 0;
  // reminderId:number = 0;
  // isNoted:boolean=true;
  // additionalReminder:AdditionalReminder;
  public days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  
  constructor(private customereSalesService: CustomerSalesService, private formBuilder: FormBuilder,
    private reminderService: ReminderService, private commonService:CommonService) {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.customerSalesFormAdditional = this.formBuilder.group({
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
      comment: [''],
      extendToDays:['', Validators.required],
      extendedReminderRemark:['', Validators.required]
    })
   
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.additionalSelectedID = Number(localStorage.getItem('reminderIdAdditional'))
      this.additionalSelectedDept = localStorage.getItem('deptModalAdditional')
      
      if(this.additionalSelectedDept == 'Sales')
      {
        this.openAdditionalSalesModal(this.additionalSelectedID);
      }
      else if(this.additionalSelectedDept == 'Service') 
      {
        return;
      }
     
    }
  }

  get valid() {
    return this.customerSalesFormAdditional.controls;
  }

  openAdditionalSalesModal(id: number) {
    this.customereSalesService.getCustomerSaleDetailsFromID(id).subscribe(data => {
      this.allCustomers = data;
   
    this.customerSalesFormAdditional.patchValue({
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
    
    this.customerId = this.allCustomers[0].id;
    // this.reminderId = this.allCustomers[0].reminderId;
  })
  
    this.salesAdditonalReminderDisplay = "block";
  }

  onCloseHandledAdditional() {
    this.commonService.updateAdditionalReminderModal(false);
    this.salesAdditonalReminderDisplay = "none";
    localStorage.removeItem('reminderIdAdditional')
    localStorage.removeItem('deptModalAdditional')
    // localStorage.removeItem('isNoted')
    // this.reminderId =0;
    // localStorage.clear();
  }

  updateAdditionalReminder(additionalReminder:AdditionalReminder)
  {
    additionalReminder.customerId = this.customerId;
    additionalReminder.reminderId = this.additionalSelectedID;
    additionalReminder.createdBy = this.createdBy;
    additionalReminder.department = 'Sales';
    additionalReminder.additionalDays = Number(this.customerSalesFormAdditional.controls['extendToDays'].value);
    additionalReminder.additionalRemark = this.customerSalesFormAdditional.controls['extendedReminderRemark'].value;
    
    this.reminderService.updateAdditionalReminderDetailsFromCustomerId(additionalReminder).subscribe(data => {
      var resultData = Object.values(data)[0];
      if(resultData == 'Additional Reminder Updated Successfully !')
      {
        alert(resultData);

      //  setTimeout(() => {
        localStorage.removeItem('reminderIdAdditional');
        localStorage.removeItem('deptModalAdditional');
        // localStorage.removeItem('isNoted')
        window.location.reload();
      // }, 1000);
      }
    })
  }
}
