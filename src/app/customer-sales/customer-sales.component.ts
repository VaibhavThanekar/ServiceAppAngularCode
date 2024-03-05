import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {ProductNameList} from '../models/product'
import { CustomerSalesService } from '../services/customer-sales.service';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import { DurationList } from '../models/commonMaster';
import { CustomerSales } from '../models/customer-sales';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
  createdBy:number = 0;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private formBuilder: FormBuilder, private salesService:CustomerSalesService){
    
    if (typeof localStorage !== 'undefined') {
      this.createdBy = Number(localStorage.getItem('userId'));
    }
    
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

  addCustomerSales(_customerSales: CustomerSales) {
    _customerSales.createdBy = this.createdBy;

    console.log('_customerSales', _customerSales);
    console.log('this.createdBy', this.createdBy);
 
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
          window.location.reload();
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
 
  }
}
