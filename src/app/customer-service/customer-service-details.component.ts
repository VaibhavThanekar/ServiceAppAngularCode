import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerServiceService } from '../services/customer-service.service'
import { CurrentStatusList, CustomerService, CustomerServiceDetails, ServiceChargeList } from '../models/customer-service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';

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
    'visitedDate', 'timeOfVisit', 'isProductInWarranty', 'customerComplaint', 'serviceLocation',
    'serviceCost', 'currentStatus', 'otherStatus', 'createdBy', 'createdDate'
  ];
 
  posts: any;
  display = "none";
   public selectedStatus: number;
   
  myDate = new Date();
  userId:any;
  userRole:any;
  department:any
  public serviceChargesList: ServiceChargeList[];
  public currentStatusList: CurrentStatusList[];
  public selectedStatusId: number;
  public serviceChargeId: number;
  createdBy:number = 0;
  customerID:number = 0;
  selectedCustomerId:number=0;
  serviceCostAmount:number;
  userName:any
  userMoblieNo:any;
  fileName:any;
  filePath:any;
  isPartReplaced:boolean=false;
  checked:boolean=false;
  isReadonly:boolean= true;
  isReadonlyCost:boolean= true;
  submitted = false;
  editMode:boolean= false;
  modifiedBy:number = 0;
  createdDate:any;
  selectedCustomeName:string;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private customereDetailsService: CustomerServiceService, 
    private formBuilder: FormBuilder, private customerService:CustomerServiceService,
    private messageboxOk:MessageboxOkComponent) {
    if (typeof localStorage !== 'undefined')
      {
        this.modifiedBy = Number(localStorage.getItem('userId'));
        this.createdBy = Number(localStorage.getItem('userId'));
      }
    
    this.customerServiceForm = this.formBuilder.group({
      customerName: [''],
      mobileNumber: [''],
      customerAddress: [''],
      servicePerson: [''],
      isProductInWarranty: [''],
      visitedDate:[''],
      timeOfVisit: [''],
      customerComplaint: [''],
      serviceChargeId: [0, Validators.required],
      currentStatusId: [0, Validators.required],
      currentStatus: [''],
      serviceChargeCost: ['', Validators.required],
      selectedFileName:[''],
      otherCost:[0],
      otherStatus: [''],
      isPartReplaced:[false],
      partDetails:[''],
      partCost:[''],
      createdBy: [''],
      fileName: ['']

    })

    this.customerServiceForm.get('serviceChargeId')?.disable();
    this.customerServiceForm.get('currentStatusId')?.disable();
  }

  ngOnInit(): void {
    this.loadDropdowns();
  }

  get valid() {
    return this.customerServiceForm.controls;
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
    this.isReadonly=true;
    this.isReadonlyCost=true;
    this.editMode = false;
    this.disabledControls();
  }

  selectedCharge(value: any) {
    // this.isReadonly = true;
    this.serviceChargeId = value;

    var selectedLocation = this.serviceChargesList.filter((x=> x.id == this.serviceChargeId));
    this.serviceCostAmount = selectedLocation[0].cost;

    this.customerServiceForm.patchValue({
        serviceChargeCost: this.serviceCostAmount.toString()
      });

    if(this.serviceChargeId == 599){
      this.isReadonlyCost = false;
    }
    else{
      this.isReadonlyCost = true;
    }
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    if(event == null) return;
    
    this.selectedFile = event.target.files[0] ?? null;
    const file =  event.target.files[0] ?? null;
    const formData = new FormData();
    formData.append('file', file);
    this.customerService.uploadServiceQuation(formData).subscribe(data =>{
      this.fileName = data[0].fileName;
      this.filePath = data[0].sourcePath;
    })
    
    this.customerServiceForm.patchValue({
      fileName:this.selectedFile.name
    })
  }

  downloadQuotation(){
    this.customereDetailsService.downloadServiceQuation(this.selectedCustomeName, this.fileName, this.filePath).subscribe(resultData =>{
      if(resultData == "File downloaded successfully !"){
        this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
                this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
                  if(result == 'Ok'){
                    setTimeout(() => 
                      location.reload(), 0)
                  }
                });
      }
    })
  }

  updateCustomerDetails(customerService:CustomerService, buttonContent:any){
    this.submitted = true;
    if(this.editMode == true && buttonContent == 'Save'){
      if (this.customerServiceForm.invalid) {
        return;
      } 
      else {

        if (this.customerServiceForm.valid) {
          if(this.editMode && this.selectedCustomerId > 0){
            customerService.createdBy = this.createdBy;
            customerService.modifiedBy = this.modifiedBy;
            customerService.id = this.selectedCustomerId;
            customerService.serviceChargeId = Number(this.customerServiceForm.controls['serviceChargeId'].value);
            customerService.quatationPath = this.filePath;
            customerService.isPartReplaced = this.checked;
            customerService.otherCharge =  Number(this.customerServiceForm.controls['serviceChargeCost'].value);

           
          
            if(customerService.isPartReplaced == false){
              customerService.partCost = 0;
              customerService.partDetails = '';
            }

            if(customerService.isProductInWarranty.toString() == "Non Warranty"){
              customerService.isProductInWarranty = false;
            }
            else{
              customerService.isProductInWarranty = true;
            }

            this.customereDetailsService.updateCustomerService(customerService).subscribe(result =>{
              var resultData = Object.values(result)[0];
              if(resultData == 'Customer Service Information Updated Successfully !'){
                this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
                this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
                  if(result == 'Ok'){
                    setTimeout(() => location.reload(), 0)
                  }
                });

                // alert(resultData);
                // setTimeout(() => 
                //   location.reload(), 0)
              }
            });
          }
        }
      }
    }
    else{
      this.customerServiceForm.get('serviceChargeId')?.enable();
      this.customerServiceForm.get('currentStatusId')?.enable();
      this.isReadonly=false;
      this.isReadonlyCost=true;
      this.editMode = true;
    }
   
  }

  disabledControls(){
    this.customerServiceForm.get('serviceChargeId')?.disable();
    this.customerServiceForm.get('currentStatusId')?.disable();
    this.isReadonly=true;
    this.isReadonlyCost = true;
    this.editMode = false;
  }

  currentDate = formatDate(this.myDate, 'yyyy-MM-dd', 'en-US').toString();
  fileNameNew = "CustomerDetails_"+ this.currentDate +".xlsx"
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
    XLSX.writeFile(wb, this.fileNameNew);

  }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    if (typeof localStorage !== 'undefined') {
      this.userRole =  localStorage.getItem('role');
      this.department =  localStorage.getItem('department');
      this.userId =  localStorage.getItem('userId');
    }  
    
    this.getAllCustomerServiceDetails(this.department, this.userId);
  }

  selectedItem(id: any) {
    // console.log(id);
    // console.log(this.allCustomers);
    let selectedCustomer = this.allCustomers.find((p: any) => {
      return p.id == id
    });

    // console.log(selectedCustomer);
    this.selectedCustomerId = id;
    this.customerServiceForm.patchValue({
      id: selectedCustomer?.id,
      customerName: selectedCustomer?.customerName,
      mobileNumber: selectedCustomer?.mobileNumber,
      customerAddress: selectedCustomer?.customerAddress,
      servicePerson: selectedCustomer?.servicePersonName,
      isProductInWarranty: selectedCustomer?.isProductInWarranty,
      visitedDate:selectedCustomer?.visitedDate,
      timeOfVisit: selectedCustomer?.timeOfVisit,
      customerComplaint: selectedCustomer?.customerComplaint,
      // selectedCharge:selectedCustomer?.serviceCharge,
      serviceChargeId: selectedCustomer?.serviceChargeId,
      serviceChargeCost: selectedCustomer?.serviceCost,
      currentStatusId:selectedCustomer.currentStatusId,
      currentStatus: selectedCustomer?.currentStatus,
      otherStatus: selectedCustomer?.otherStatus,
      isPartReplaced:selectedCustomer?.isPartReplaced,
      partDetails:selectedCustomer?.partDetails,
      partCost:selectedCustomer?.partCost,
      fileName: selectedCustomer?.fileName,
      filePath: selectedCustomer?.quatationPath,
      createdby:selectedCustomer?.createdby,
      createdDate:selectedCustomer?.createdDate,
      
    })
    this.selectedCustomeName = selectedCustomer?.customerName;
    this.checked = selectedCustomer.isPartReplaced;
    this.serviceChargeId = selectedCustomer.serviceChargeId;

    if(selectedCustomer?.serviceChargeId == 599){
      serviceChargeCost: selectedCustomer?.otherCharge; 
    }

    this.fileName = selectedCustomer?.fileName;
    this.filePath = selectedCustomer?.quatationPath;
    this.createdDate =selectedCustomer?.createdDate;
  }

  checkState(event:boolean){
    this.checked = !event;
    if(this.checked){
      this.isPartReplaced = true;
       this.customerServiceForm.get('partDetails')?.setValidators(Validators.required);
       this.customerServiceForm.get('partCost')?.setValidators(Validators.required);
    }
    else{
      this.isPartReplaced = false;
      this.customerServiceForm.get('partDetails')?.clearValidators();
      this.customerServiceForm.get('partCost')?.clearValidators();
    }
    this.customerServiceForm.get('partDetails')?.updateValueAndValidity();
    this.customerServiceForm.get('partCost')?.updateValueAndValidity();
  }

  getAllCustomerServiceDetails(department:any, userId:number) {
    this.customereDetailsService.getAllCustomerServiceDetails(department, userId).subscribe(data => {
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

  private loadDropdowns() {
    this.customerService.getServiceCharges().subscribe(data => {
      this.serviceChargesList = data;
    })

    this.customerService.getCurrentStatus().subscribe(data => {
      this.currentStatusList = data;
    })
  }

}
