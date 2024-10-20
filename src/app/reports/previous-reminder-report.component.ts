import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerServiceService } from '../services/customer-service.service'
import { CustomerServiceDetails, CustomerServiceDetailsReportParm, ServicePersonList } from '../models/customer-service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import { ProductNameList } from '../models/product';
import { UserName } from '../models/user';
import { DepartmentMaster } from '../models/departmentMaster';
import moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { Console } from 'node:console';
import { CustomerNames } from '../models/customer';
import { ReminderService } from '../services/reminder.service';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';
import { PreviousReminderDetails } from '../models/reminder';

@Component({
  selector: 'app-previous-reminder-report',
  templateUrl: './previous-reminder-report.component.html',
  styleUrl: './previous-reminder-report.component.css'
})
export class PreviousReminderReportComponent {
  previousRemindersReportForm!: FormGroup;
  dataSource!: MatTableDataSource<PreviousReminderDetails>;
  allCustomers: any = []
  // public productNameList: ProductNameList[];
  // public servicePersonsList: ServicePersonList[] | undefined;
  // parm:CustomerSalesDetailsReportParm;
  isShow:boolean=false;
  fromDate:string;
  toDate:string;
  submitted = false;
  userId:any;
  customerId:any;
  department:any
  userName:any
  public allCustomerNames: CustomerNames[];

  public displayedColumns: string[] = ['sn', 'description',  'reminderDateTime',
  'isActive', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate'
  ];

  posts: any;
  display = "none";
  myDate = new Date();

  constructor(private formBuilder: FormBuilder,private customerService: CustomerServiceService, private reminderService:ReminderService,
    private spinner: NgxSpinnerService,  private messageboxOk:MessageboxOkComponent) {
    this.previousRemindersReportForm = this.formBuilder.group({
      // fromDate:['', Validators.required],
      // toDate:['', Validators.required],
      customerId: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.loadDropdowns();
    // this.searchReport();
  }

  get valid() {
    return this.previousRemindersReportForm.controls;
  }

  getAllCustomerNames() {
    this.customerService.getAllCustomerNames().subscribe(data => {
      this.allCustomerNames = data;
    })
  }

  private loadDropdowns() {
    this.getAllCustomerNames();
  }

  searchReport(){
    if (this.previousRemindersReportForm.invalid) {
      this.submitted = false
      return;
    } 
    else
    {
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();

          this.dataSource = new MatTableDataSource();
           this.customerId = Number(this.previousRemindersReportForm.controls['customerId'].value)

          this.reminderService.getPreviousReminderDetailsFromCustomerId('Sales',this.customerId, 0).subscribe(data => {
            this.allCustomers = data;
            if(data.length > 0){
              this.isShow = true;
              this.posts = data;
              this.dataSource = new MatTableDataSource(this.posts);
              // this.dataSource.paginator = this.paginator;
              // this.dataSource.sort = this.sort;
            
              setTimeout(() => this.dataSource.paginator = this.paginator);
              this.dataSource.sort = this.sort;
            }
            else{
              this.isShow = false;
              // alert('No records found for this filter');
              this.messageboxOk.openDialog('0ms', '0ms', 'No records found for this filter', 'Information');
            }
          })

        }, 2000);

    
    }
  }

  clearFields(){
    this.previousRemindersReportForm.reset();
    this.dataSource = new MatTableDataSource();
    this.isShow = false;
    

    // this.dataSource = new MatTableDataSource();
    // this.isShow = false;
    // // this.customerSalesReportForm.reset();
    // this.customerServiceReportForm = this.formBuilder.group({
    //   fromDate:[''],
    //   toDate:[''],
    //   salesPersonId: [0]
    //   })
  }

  currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US').toString();
  fileName = "CustomerServiceDetailsReport_"+ this.currentDate +".xlsx"
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
    if (typeof localStorage !== 'undefined') {
      this.department =  localStorage.getItem('department');
      this.userId =  localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
    }  
  }

  // getAllCustomerSalesDetails() {
  //   this.customerServiceService.getAllCustomerServiceDetails().subscribe(data => {
  //     this.allCustomers = data;
  //     this.posts = data;
  //     this.dataSource = new MatTableDataSource(this.posts);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dateFilter(date: Date | any): boolean {
    if (date && !(date instanceof Date)) {
      const strValue = date.toString().trim();
      // Check for YYYY/MM/DD format:
      return /^\d{4}-\d{2}-\d{2}$/.test(strValue);
    }
    return true;
  }
}
