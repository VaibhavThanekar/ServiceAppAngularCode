import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSales, CustomerSalesDetails } from '../models/customer-sales';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import { DepartmentMaster } from '../models/departmentMaster';
import { ProductNameList } from '../models/product';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-customer-sales-details',
  templateUrl: './customer-sales-details.component.html',
  styleUrl: './customer-sales-details.component.css'
})
export class CustomerSalesDetailsComponent {
  customerSalesDetailsForm!: FormGroup;
  dataSource!: MatTableDataSource<CustomerSalesDetails>;
  allCustomers: any = []
  public productNameList: ProductNameList[];

  public displayedColumns: string[] = ['actions', 'customerName', 'mobileNumber', 'customerAddress', 'salesPerson',
    'visitedDate', 'timeOfVisit', 'durationOfSale', 'reminderDate', 'product',
    'remark', 'fileName','createdBy', 'createdDate'
  ];

  posts: any;
  display = "none";
  myDate = new Date();
  userId:any;
  userRole:any;
  department:any
  selectedProduct:string;
  editable: boolean = false;
  reminderDate=new FormControl();
  fileName:any;
  filePath:any;
  editMode:boolean= false;
  isReadonly:boolean= true;
  submitted = false;
  selectedCustomerId:number=0; 
  modifiedBy:number = 0;
  createdBy:number = 0;
  createdDate:any;
  
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private customereSalesService: CustomerSalesService, private formBuilder: FormBuilder, private commonService:CommonService) {
    if (typeof localStorage !== 'undefined')
      {
        this.modifiedBy = Number(localStorage.getItem('userId'));
        this.createdBy = Number(localStorage.getItem('userId'));
      }

    this.customerSalesDetailsForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      salesPerson: [''],
      visitedDate:[''],
      timeOfVisit: [''],
      durationOfSale: [''],
      reminderDate: [''],
      productId:[0, Validators.required],
      product: [''],
      remark: ['', Validators.required],
      comment: [''],
      fileName: [''],
      createdBy: ['']
      // ,createdDate: ['']
      
    })

    this.customerSalesDetailsForm.get('productId')?.disable();
  }

  ngOnInit(): void {
    this.loadDropdowns();
  }

  private loadDropdowns() {
    this.customereSalesService.getAllProductNames().subscribe(data =>{
       this.productNameList = data;
     })
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
    this.disabledControls();
    this.editMode = false;
  }

  get valid() {
    return this.customerSalesDetailsForm.controls;
  }

  updateCustomerDetails(customerSales:CustomerSales, buttonContent:any){
    this.submitted = true;
    if(this.editMode == true && buttonContent == 'Save'){
      if (this.customerSalesDetailsForm.invalid) {
        return;
      } 
      else {

        if (this.customerSalesDetailsForm.valid) {
          if(this.editMode && this.selectedCustomerId > 0){
             customerSales.createdBy = this.createdBy;
            customerSales.modifiedBy = this.modifiedBy;
            customerSales.id = this.selectedCustomerId;
            customerSales.quatationPath = this.filePath;

            this.customereSalesService.updateCustomerSales(customerSales).subscribe(result =>{
              var resultData = Object.values(result)[0];
              if(resultData == 'Customer Sales Information Updated Successfully !'){
                alert(resultData);
                setTimeout(() => 
                  location.reload(), 0)
                // location.reload();
              }
            });
          }
        }
      }
    }
    else{
      this.customerSalesDetailsForm.get('productId')?.enable();
      this.isReadonly=false;

      this.editMode = true;
    }
   
  }

  disabledControls(){
    this.customerSalesDetailsForm.get('productId')?.disable();
    this.isReadonly=true;

    this.editMode = false;
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    if(event == null) return;
    
    this.selectedFile = event.target.files[0] ?? null;
    const file =  event.target.files[0] ?? null;
    const formData = new FormData();
    formData.append('file', file);
    this.customereSalesService.uploadSalesQuation(formData).subscribe(data =>{
      this.fileName = data[0].fileName;
      this.filePath = data[0].sourcePath;

      // console.log("File Name :-" + this.fileName + "  FIle Path : -" + this.filePath);
    })
    
    this.customerSalesDetailsForm.patchValue({
      fileName:this.selectedFile.name
    })
  }

  currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US').toString();
  excelFileName = "CustomerSalesDetails_"+ this.currentDate +".xlsx"
  exportAsExcel()
  {
    let data = document.getElementById("tblCustomerDetails");
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)
    
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };
    /* here 12 is your column number (n-1) */
    // delete (ws['O1'])
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.excelFileName);

  }


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    if (typeof localStorage !== 'undefined') {
      this.userRole =  localStorage.getItem('role');
      this.department =  localStorage.getItem('department');
      this.userId =  localStorage.getItem('userId');
    }  
    
    this.getAllCustomerSalesDetails(this.department, this.userId);
  }

  selectedItem(id: any) {
    let selectedCustomer = this.allCustomers.find((p: any) => {
      return p.id == id
    });

    this.selectedCustomerId = id;
    this.customerSalesDetailsForm.patchValue({
      id: selectedCustomer?.id,
      customerName: selectedCustomer?.customerName,
      mobileNumber: selectedCustomer?.mobileNumber,
      customerAddress: selectedCustomer?.customerAddress,
      salesPerson: selectedCustomer?.salesPerson,
      durationOfSale: selectedCustomer?.durationOfSale,
      visitedDate: selectedCustomer?.visitedDate,
      timeOfVisit: selectedCustomer?.timeOfVisit,
      reminderDate: selectedCustomer?.reminderDate,
      product: selectedCustomer?.product,
      productId:selectedCustomer?.productId,
      remark: selectedCustomer?.remark,
      comment: selectedCustomer?.comment,
      fileName: selectedCustomer?.fileName,
      filePath: selectedCustomer?.quatationPath,
      createdby:selectedCustomer?.createdby,
      createdDate:selectedCustomer?.createdDate,
    

      // ,isSelectProduct:true
    })
      
      this.fileName = selectedCustomer?.fileName;
      this.filePath = selectedCustomer?.quatationPath;
      this.createdDate =selectedCustomer?.createdDate;
  }

  getAllCustomerSalesDetails(department:any, userId:number) {
    this.customereSalesService.getAllCustomerSaleDetails(department, userId).subscribe(data => {
      this.allCustomers = data;
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
