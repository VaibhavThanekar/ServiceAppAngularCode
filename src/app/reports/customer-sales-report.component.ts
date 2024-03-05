import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSalesDetails, CustomerSalesDetailsReportParm } from '../models/customer-sales';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import { ProductNameList } from '../models/product';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import moment from 'moment';

@Component({
  selector: 'app-customer-sales-report',
  templateUrl: './customer-sales-report.component.html',
  styleUrl: './customer-sales-report.component.css'
})
export class CustomerSalesReportComponent {
  customerSalesReportForm!: FormGroup;
  dataSource!: MatTableDataSource<CustomerSalesDetails>;
  allCustomers: any = []
  public productNameList: ProductNameList[];
  public salesPersonList: UserName[];
  parm:CustomerSalesDetailsReportParm;
  isShow:boolean=false;
  fromDate:string;
  toDate:string;
  submitted = false;

  public displayedColumns: string[] = ['sn', 'customerName', 'mobileNumber', 'customerAddress', 'product','salesPerson',
    'visitedDate', 'timeOfVisit', 'durationOfSale', 'reminderDate',
    'remark', 'createdBy', 'createdDate'
  ];

  posts: any;
  display = "none";
  myDate = new Date();

  constructor(private formBuilder: FormBuilder,private salesService:CustomerSalesService) {
    this.customerSalesReportForm = this.formBuilder.group({
      fromDate:['', Validators.required],
      toDate:['', Validators.required],
      salesPersonId: [0],
      productId: [0],
      })
  }

  ngOnInit(): void {
    this.loadDropdowns();
    // this.searchReport();
  }

  get valid() {
    return this.customerSalesReportForm.controls;
  }

  private loadDropdowns() {

    this.salesService.getAllProductNames().subscribe(data =>{
       this.productNameList = data;
     })

     this.salesService.getUserNamesFromDepartmentId(DepartmentMaster.Sales).subscribe(data =>{
       this.salesPersonList = data;
     })
  }

  searchReport(_customerSales: CustomerSalesDetailsReportParm){
    if (this.customerSalesReportForm.invalid) {
      this.submitted = false
      return;
    } 
    else
    {
    this.dataSource = new MatTableDataSource();
    _customerSales.fromDate = moment(this.fromDate).format("YYYY-MM-DD");
    _customerSales.toDate = moment(this.toDate).format("YYYY-MM-DD");
    this.salesService.getCustomerSaleDetailsReport(_customerSales.fromDate, _customerSales.toDate, _customerSales.salesPersonId, _customerSales.productId).subscribe(data => {
      this.allCustomers = data;
      if(data.length > 0){
        this.isShow = true;
        console.log(data);
        this.posts = data;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else{
        this.isShow = false;
        alert('No records found for this filter');
      }
    })
    }
  }

  clearFields(){
    this.dataSource = new MatTableDataSource();
    this.isShow = false;
    // this.customerSalesReportForm.reset();
    this.customerSalesReportForm = this.formBuilder.group({
      fromDate:[''],
      toDate:[''],
      salesPersonId: [0],
      productId: [0],
      })
  }

  currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US').toString();
  fileName = "CustomerSalesDetails_"+ this.currentDate +".xlsx"
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
    XLSX.writeFile(wb, this.fileName);

  }


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    // this.getAllCustomerSalesDetails();
    // this.searchReport();
  }

  getAllCustomerSalesDetails() {
    this.salesService.getAllCustomerSaleDetails().subscribe(data => {
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

  dateFilter(date: Date | any): boolean {
    if (date && !(date instanceof Date)) {
      console.log(date);
      const strValue = date.toString().trim();
      // Check for YYYY/MM/DD format:
      return /^\d{4}-\d{2}-\d{2}$/.test(strValue);
    }
    return true;
  }
}
