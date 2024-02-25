import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerSalesService } from '../services/customer-sales.service'
import { CustomerSalesDetails } from '../models/customer-sales';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-sales-details',
  templateUrl: './customer-sales-details.component.html',
  styleUrl: './customer-sales-details.component.css'
})
export class CustomerSalesDetailsComponent {
  customerSalesForm!: FormGroup;
  dataSource!: MatTableDataSource<CustomerSalesDetails>;
  allCustomers: any = []

  public displayedColumns: string[] = ['actions', 'customerName', 'mobileNumber', 'customerAddress', 'salesPerson',
    'visitedDate', 'timeOfVisit', 'durationOfSale', 'reminderDate', 'product',
    'remark', 'createdBy', 'createdDate'
  ];

  posts: any;
  display = "none";
  myDate = new Date();

  constructor(private customereSalesService: CustomerSalesService, private formBuilder: FormBuilder) {
    this.customerSalesForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      salesPerson: [''],
      visitedDate:[''],
      timeOfVisit: [''],
      durationOfSale: [''],
      reminderDate: [''],
      product: [''],
      remark: [''],
      comment: [''],
      createdBy: [''],
      createdDate: [''],
    })
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
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
    this.getAllCustomerSalesDetails();
  }

  selectedItem(id: any) {
    // console.log(id);
    // console.log(this.allCustomers);
    let selectedCustomer = this.allCustomers.find((p: any) => {
      return p.id == id
    });

    // console.log(selectedCustomer);

    this.customerSalesForm.patchValue({
      customerName: selectedCustomer?.customerName,
      mobileNumber: selectedCustomer?.mobileNumber,
      customerAddress: selectedCustomer?.customerAddress,
      salesPerson: selectedCustomer?.salesPerson,
      durationOfSale: selectedCustomer?.durationOfSale,
      visitedDate: selectedCustomer?.visitedDate,
      timeOfVisit: selectedCustomer?.timeOfVisit,
      reminderDate: selectedCustomer?.reminderDate,
      product: selectedCustomer?.product,
      remark: selectedCustomer?.remark,
      comment: selectedCustomer?.comment
    })
    // console.log(selectedCustomer);
  }

  getAllCustomerSalesDetails() {
    this.customereSalesService.getAllCustomerSaleDetails().subscribe(data => {
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
