import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CustomerNames } from '../models/customer';
import { CustomerServiceService } from '../services/customer-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ServicePersonList, ServiceChargeList, CurrentStatusList, CustomerService } from '../models/customer-service'
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrl: './customer-service.component.css'
})
export class CustomerServiceComponent {
  customerServiceForm!: FormGroup;
  submitted = false;

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

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private formBuilder: FormBuilder, private customerService: CustomerServiceService) {

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
      serviceChargeCost: [''],
      otherStatus: ['']
      })
  }


  ngOnInit(): void {
    this.loadDropdowns();
  }

  get valid() {
    return this.customerServiceForm.controls;
  }

  getAllCustomerNames() {
    this.customerService.getAllCustomerNames().subscribe(data => {
      this.allCustomerNames = data;
    })
  }
  addCustomerService(_customerService: CustomerService) {
    _customerService.createdBy = 0;
    _customerService.modifiedBy = 0;
    _customerService.serviceChargeId = this.serviceChargeId;
    _customerService.mobileNumber = _customerService.mobileNumber.toString();

    if (this.customerServiceForm.invalid) {
      this.submitted = false
      return;
    } 
    else {
      
      if (this.customerServiceForm.valid) {
         this.customerService.saveCustomerService(_customerService).subscribe(result => {
        var resultData = Object.values(result)[0];
        if (resultData = 'Service Information Saved Successfully !') {
          alert(resultData);
          setTimeout(() => 
          this.formGroupDirective.resetForm(), 0)
        }
      });
      }
    }
  }

  selectedCharge(value: ServiceChargeList) {
    this.serviceChargeId = value.id;
    this.customerServiceForm.patchValue({
      serviceChargeCost: value.cost.toString()
    });
  }

  private names_filter(value: string): CustomerNames[] {
    const filterValue = value.toLowerCase();
    return this.allCustomerNames.filter(option =>
      option.customerName.toLowerCase().includes(filterValue)
    );
  }

  resetForm(){
    this.customerServiceForm.reset();
  } 

  private loadDropdowns() {

    this.customerService.getServicePersons().subscribe(data => {
      this.servicePersonsList = data;
    })

    this.customerService.getServiceCharges().subscribe(data => {
      this.serviceChargesList = data;
    })

    this.customerService.getCurrentStatus().subscribe(data => {
      this.currentStatusList = data;
    })
  }
}
