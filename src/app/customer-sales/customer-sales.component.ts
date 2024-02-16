import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {ProductNameList} from '../models/product'
import { CustomerSalesService } from '../services/customer-sales.service';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import { DurationList } from '../models/commonMaster';
import { CustomerSales } from '../models/customer-sales';
@Component({
  selector: 'app-customer-sales',
  templateUrl: './customer-sales.component.html',
  styleUrl: './customer-sales.component.css'
})
export class CustomerSalesComponent {
  customerSalesForm!: FormGroup;
  submitted = false;
  public productNameList: ProductNameList[];
  public salesPersonList: UserName[];
  public durationList: DurationList[];

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private formBuilder: FormBuilder, private salesService:CustomerSalesService){

    this.customerSalesForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      customerAddress: ['', Validators.required],
      salesPersonId: ['', Validators.required],
      timeOfVisit: ['', Validators.required],
      durationOfSaleId: ['', Validators.required],
      productId: ['', Validators.required],
      remark: ['', Validators.required],
      comment: ['']
      })
  }

  ngOnInit(): void {
    this.loadDropdowns();
  }

  get valid() {
    return this.customerSalesForm.controls;
  }

  // getAllProductNames(){
  //   this.salesService.getAllProductNames().subscribe(data =>{
  //    console.table(data);
  //     this.allProductNames = data;
  //   })
  // }

  addCustomerSales(_customerSales: CustomerSales) {
    _customerSales.createdBy = 0;
    _customerSales.modifiedBy = 0;
    // _customerService.serviceChargeId = this.serviceChargeId;
    _customerSales.mobileNumber = _customerSales.mobileNumber.toString();

    if (this.customerSalesForm.invalid) {
      this.submitted = false
      return;
    } 
    else {
      
      if (this.customerSalesForm.valid) {
        this.salesService.saveCustomerSales(_customerSales).subscribe(result => {
        var resultData = Object.values(result)[0];
        if (resultData = 'Sales Information Saved Successfully !') {
          alert(resultData);
          setTimeout(() => 
          this.formGroupDirective.resetForm(), 0)
        }
      });
      }
    }
  }

  resetForm(){
    this.customerSalesForm.reset();
  } 


  private loadDropdowns() {

    this.salesService.getAllProductNames().subscribe(data =>{
       this.productNameList = data;
     })

     this.salesService.getUserNamesFromDepartmentId(DepartmentMaster.Sales).subscribe(data =>{
       this.salesPersonList = data;
     })

    this.salesService.getAllDurationList().subscribe(data => {
      this.durationList = data;
    })

    // this.customerService.getCurrentStatus().subscribe(data => {
    //   this.currentStatusList = data;
    // })
  }
}
