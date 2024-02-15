import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {ProductNameList} from '../models/product'
import { CustomerSalesService } from '../services/customer-sales.service';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import { DurationList } from '../models/commonMaster';
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

  constructor(private formBuilder: FormBuilder, private salesService:CustomerSalesService){
    this.customerSalesForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      customerAddress: ['', Validators.required],
      salesPersonId: ['', Validators.required],
      timeOfVisit: ['', Validators.required],
      durationOfSale: ['', Validators.required],
      customerComplaint: ['', Validators.required],
      product: ['', Validators.required],
      remark: ['', Validators.required],
      // serviceChargeCost: [''],
      // otherStatus: ['']
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
