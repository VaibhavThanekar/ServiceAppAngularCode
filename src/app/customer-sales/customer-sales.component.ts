import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {ProductNameList} from '../models/product'
import { CustomerSalesService } from '../services/customer-sales.service';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import { DurationList } from '../models/commonMaster';
import { CustomerSales } from '../models/customer-sales';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonService } from '../services/common.service';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';
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
  customerID:number = 0;
  userId:any;
  department:any
  userName:any
  userMoblieNo:any;
  fileName:any;
  filePath:any;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  srcResult: any;
  constructor(private formBuilder: FormBuilder, private salesService:CustomerSalesService, private commonService:CommonService, private messageboxOk:MessageboxOkComponent ){
    
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
      comment: [''],
      selectedFileName:['']
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
    _customerSales.mobileNumber = _customerSales.mobileNumber.toString();
    _customerSales.fileName = this.fileName;
    _customerSales.quatationPath = this.filePath;

    if (this.customerSalesForm.invalid) {
      this.submitted = false
      return;
    } 
    else {
      
      if (this.customerSalesForm.valid) {
        this.salesService.saveCustomerSales(_customerSales).subscribe(result => {
        var splitResult = Object.values(result)[0].split(',');
        var resultData = splitResult[0];
        this.customerID = splitResult[1];
        if (resultData == 'Sales Information Saved Successfully !') {
          this.commonService.SendMessageToCustomer('Sales',this.customerID, _customerSales.customerName, _customerSales.mobileNumber, '0', this.userMoblieNo).subscribe(result =>{
           
            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                setTimeout(() => 
                  this.formGroupDirective.resetForm(), 0)
                  window.location.reload();
              }
            });
          });
        }
      });
      }
    }
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    if(event == null) return;
    
    this.selectedFile = event.target.files[0] ?? null;
    const file =  event.target.files[0] ?? null;
    const formData = new FormData();
    formData.append('file', file);
    this.salesService.uploadSalesQuation(formData).subscribe(data =>{
      this.fileName = data[0].fileName;
      this.filePath = data[0].sourcePath;

      // console.log("File Name :-" + this.fileName + "  FIle Path : -" + this.filePath);
    })
    
    this.customerSalesForm.patchValue({
      selectedFileName:this.selectedFile.name
    })
  }

  resetForm(){
    this.customerSalesForm.reset();
  } 

  ngAfterViewInit() {
    if (typeof localStorage !== 'undefined') {
      this.department =  localStorage.getItem('department');
      this.userId =  localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
      this.userMoblieNo = localStorage.getItem('mobileNumber')
    }  
  }

  private loadDropdowns() {

    this.salesService.getAllProductNames().subscribe(data =>{
       this.productNameList = data;
     })

     this.salesService.getUserNamesFromDepartmentId(DepartmentMaster.Sales).subscribe(data =>{
      if(this.department == 'Sales'){
        this.salesPersonList = data.filter((x:any) => x.id == this.userId);
      }
      else{
        this.salesPersonList = data;
      }
     })

    this.salesService.getAllDurationList().subscribe(data => {
      this.durationList = data;
    })
 
  }
}
