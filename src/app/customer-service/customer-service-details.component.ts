import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerServiceService } from '../services/customer-service.service'
import { CustomerServiceDetails } from '../models/customer-service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-service-details',
  templateUrl: './customer-service-details.component.html',
  styleUrl: './customer-service-details.component.css'
})
export class CustomerServiceDetailsComponent {
  customerServiceForm!: FormGroup;
  dataSource!: MatTableDataSource<CustomerServiceDetails>;
  // public allCustomers:CustomerServiceDetails[] = [];
  allCustomers: any = []

  public displayedColumns: string[] = ['actions', 'customerName', 'mobileNumber', 'customerAddress', 'servicePersonName',
    'timeOfVisit', 'isProductInWarranty', 'customerComplaint', 'serviceLocation',
    'serviceCost', 'currentStatus', 'otherStatus'
  ];

  // public displayedColumns: string[] =['Id', 'customerName', 'mobileNumber', 'customerAddress', 'servicePersonName',
  // 'visitedDate', 'timeOfVisit', 'isProductInWarranty', 'customerComplaint', 'serviceLocation', 
  // 'serviceCost', 'isSMSSentToCustomer', 'isSMSSentToManager', 'currentStatus', 'otherStatus'
  // ];
  posts: any;
  display = "none";
  public selectedStatus: string;
  myDate = new Date();

  constructor(private customereDetailsService: CustomerServiceService, private formBuilder: FormBuilder) {
    this.customerServiceForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      servicePerson: [''],
      isProductInWarranty: [''],
      timeOfVisit: [''],
      customerComplaint: [''],
      serviceChargeLocation: [''],
      currentStatus: [''],
      serviceChargeCost: [''],
      otherStatus: ['']

    })
  }

  ngOnInit() {
    //this.getAllCustomerServiceDetails();
  }


  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  // @ViewChild('TABLE') table: ElementRef;
  // exportAsExcel()
  //   {
  //     const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //     /* save to file */
  //     XLSX.writeFile(wb, 'SheetJS.xlsx');

  //   }

  currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US').toString();
  fileName = "CustomerDetails_"+ this.currentDate +".xlsx"
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
    this.getAllCustomerServiceDetails();
    // // this.dataSource.paginator = this.paginator;
    // // this.dataSource.sort = this.sort;
  }

  selectedItem(id: any) {
    // console.log(id);
    // console.log(this.allCustomers);
    let selectedCustomer = this.allCustomers.find((p: any) => {
      return p.id == id
    });

    // console.log(selectedCustomer);

    this.customerServiceForm.patchValue({
      customerName: selectedCustomer?.customerName,
      mobileNumber: selectedCustomer?.mobileNumber,
      customerAddress: selectedCustomer?.customerAddress,
      servicePerson: selectedCustomer?.servicePersonName,
      isProductInWarranty: selectedCustomer?.isProductInWarranty,
      timeOfVisit: selectedCustomer?.timeOfVisit,
      customerComplaint: selectedCustomer?.customerComplaint,
      serviceChargeLocation: selectedCustomer?.serviceLocation,
      serviceChargeCost: selectedCustomer?.serviceCost,
      currentStatus: selectedCustomer?.currentStatus,
      otherStatus: selectedCustomer?.otherStatus
    })
    // console.log(selectedCustomer);
  }

  getAllCustomerServiceDetails() {
    this.customereDetailsService.getAllCustomerServiceDetails().subscribe(data => {
      //  console.table(data);

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
