import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CustomerNames } from '../models/customer';
import { CustomerServiceService } from '../services/customer-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ServicePersonList, ServiceChargeList, CurrentStatusList, CustomerService } from '../models/customer-service'
import { MatSelectChange } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonService } from '../services/common.service';
import { DepartmentMaster } from '../models/departmentMaster';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrl: './customer-service.component.css'
})
export class CustomerServiceComponent {
  customerServiceForm!: FormGroup;
  submitted = false;
  isReadonly = true;

  selectedCustomerId = new FormControl(0);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
  nameFilteredOptions: Observable<CustomerNames[]>;
  public allCustomerNames: CustomerNames[];

  public servicePersonsList: ServicePersonList[];
  public serviceChargesList: ServiceChargeList[];
  public currentStatusList: CurrentStatusList[];

  public selectedStatus: number;
  public serviceChargeId: number;
  createdBy:number = 0;
  customerID:number = 0;
  serviceCostAmount:number;
  userId:any;
  department:any
  userName:any
  userMoblieNo:any;
  fileName:any;
  filePath:any;
  isPartReplaced:boolean=false;
  checked:boolean=false;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  
  constructor(private formBuilder: FormBuilder, private customerService: CustomerServiceService, private commonService:CommonService, private messageboxOk:MessageboxOkComponent) {
    if(typeof localStorage !== 'undefined'){
      this.createdBy = Number(localStorage.getItem('userId'));
    }
   
    this.customerServiceForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      customerAddress: ['', Validators.required],
      servicePersonId: ['', Validators.required],
      isProductInWarranty: ['', Validators.required],
      timeOfVisit: ['', Validators.required],
      customerComplaint: ['', Validators.required],
      serviceCharge: ['', Validators.required],
      currentStatusId: ['', Validators.required],
      // otherStatus:['',Validators.required],
      selectedFileName:[''],
      serviceChargeCost: ['', Validators.required],
      otherStatus: [''],
      partDetails:[''],
      partCost:['']
      })
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
  
  ngOnInit(): void {
    this.loadDropdowns();
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
      selectedFileName:this.selectedFile.name
    })
  }

  get valid() {
    return this.customerServiceForm.controls;
  }

  ngAfterViewInit() {
    if (typeof localStorage !== 'undefined') {
      this.department =  localStorage.getItem('department');
      this.userId =  localStorage.getItem('userId');
      this.userName = localStorage.getItem('userName');
      this.userMoblieNo = localStorage.getItem('mobileNumber')
    }  
  }

  getAllCustomerNames() {
    this.customerService.getAllCustomerNames().subscribe(data => {
      this.allCustomerNames = data;
    })
  }

  addCustomerService(_customerService: CustomerService) {
    _customerService.createdBy = this.createdBy;
    _customerService.serviceChargeId = this.serviceChargeId;
    _customerService.mobileNumber = _customerService.mobileNumber.toString();
    _customerService.fileName = this.fileName;
    _customerService.quatationPath = this.filePath;
    _customerService.isPartReplaced = this.isPartReplaced;

    if(this.isPartReplaced){
     _customerService.otherCharge = Number(this.customerServiceForm.controls['serviceChargeCost'].value);
     var totalAmount =  _customerService.otherCharge + _customerService.partCost;
     this.serviceCostAmount = totalAmount;
    }
    else{
      _customerService.partCost = 0;
    }
    
    if(_customerService.serviceChargeId != 599){
      _customerService.otherCharge = 0;
    }

    if (this.customerServiceForm.invalid) {
      this.submitted = false
      return;
    } 
    else {
      
      if (this.customerServiceForm.valid) {
         this.customerService.saveCustomerService(_customerService).subscribe(result => {
        var splitResult = Object.values(result)[0].split(',');
        var resultData = splitResult[0];
        this.customerID = splitResult[1];
        if (resultData == 'Service Information Saved Successfully !') {
          this.commonService.SendMessageToCustomer('Service',this.customerID, _customerService.customerName, _customerService.mobileNumber, this.serviceCostAmount.toString(), this.userMoblieNo).subscribe(result =>{
          
            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                setTimeout(() => this.formGroupDirective.resetForm(), 0)
                this.checked = false;
              }
            });
            
            // alert(resultData);
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)
            // this.checked = false;
          });
        }
      });
      }
    }
  }

  selectedCharge(value: ServiceChargeList) {
    this.isReadonly = true;
    this.serviceChargeId = value.id;
    this.serviceCostAmount = value.cost;
      this.customerServiceForm.patchValue({
        serviceChargeCost: value.cost.toString()
      });

    if(this.serviceChargeId == 599){
      this.isReadonly = false;
    }
    else{
      this.isReadonly = true;
    }
  }

  private names_filter(value: string): CustomerNames[] {
    const filterValue = value.toLowerCase();
    return this.allCustomerNames.filter(option =>
      option.customerName.toLowerCase().includes(filterValue)
    );
  }

  resetForm(){
    this.customerServiceForm.reset();
    this.checked = false;
  } 

  private loadDropdowns() {

    this.customerService.getServicePersons().subscribe(data => {
      if(this.department == 'Service'){
        this.servicePersonsList = data.filter((x:any) => x.id == this.userId);
      }
      else{
        this.servicePersonsList = data;
      }
    })

    this.customerService.getServiceCharges().subscribe(data => {
      this.serviceChargesList = data;
    })

    this.customerService.getCurrentStatus().subscribe(data => {
      this.currentStatusList = data;
    })
  }
}
