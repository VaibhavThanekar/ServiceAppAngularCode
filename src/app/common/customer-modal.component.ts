import { Component, OnInit } from '@angular/core';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSalesDetails } from '../models/customer-sales';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css'
})
export class CustomerModalComponent {
  customerSalesForm!: FormGroup;
  salesDisplay = "none";
  allCustomers: any = []

  constructor(private customereSalesService: CustomerSalesService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private commonService:CommonService) {
    this.customerSalesForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      salesPerson: [''],
      timeOfVisit: [''],
      durationOfSale: [''],
      reminderDate: [''],
      product: [''],
      remark: [''],
      comment: ['']

    })
  }

  // ngOnInit() {
  //   this.activatedRoute.paramMap.subscribe((params) => {
  //     let id = Number(params.get("id"));
  //     let department = params.get("department");

  //     alert(id +" " + department);
  //     //this.openSalesModal(id);

  //     });

  // }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   console.log(params);
    //   let _id = Number(params['id']);
    //   // let dept = params.("department");

    //   // console.log(_id +" " + dept);
    //   //  this.openSalesModal(_id);

    // });

    if (typeof localStorage !== 'undefined') {
      let data = Number(localStorage.getItem('id'))
      this.openSalesModal(data);
    }

    // this.getData();
  }

  getData() {
    this.customereSalesService.getCustomerSaleDetailsFromID(1).subscribe(data => {
      this.allCustomers = data;
      console.log(data);
    })

    // this.customerSalesForm.patchValue({
    //   customerName: this.allCustomers[0]?.customerName,
    //   mobileNumber: this.allCustomers[0]?.mobileNumber,
    //   customerAddress: this.allCustomers[0]?.customerAddress,
    //   salesPerson: this.allCustomers[0]?.salesPerson,
    //   durationOfSale: this.allCustomers[0]?.durationOfSale,
    //   timeOfVisit: this.allCustomers[0]?.timeOfVisit,
    //   reminderDate: this.allCustomers[0]?.reminderDate,
    //   product: this.allCustomers[0]?.product,
    //   remark: this.allCustomers[0]?.remark,
    //   comment: this.allCustomers[0]?.comment
    // })
  }

  openSalesModal(id: number) {
    console.log("customer modal ", id);
    this.customereSalesService.getCustomerSaleDetailsFromID(id).subscribe(data => {
      this.allCustomers = data;
      console.log(data);
   

    console.log(this.allCustomers);
    this.customerSalesForm.patchValue({
      customerName: this.allCustomers[0]?.customerName,
      mobileNumber: this.allCustomers[0]?.mobileNumber,
      customerAddress: this.allCustomers[0]?.customerAddress,
      salesPerson: this.allCustomers[0]?.salesPerson,
      durationOfSale: this.allCustomers[0]?.durationOfSale,
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
    localStorage.clear();
  }
}
