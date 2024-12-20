import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ServiceCharge, ServiceChargeDetails} from '../models/service-charge'
import { ProductService } from '../services/product.service'
import { ServiceChargeService } from '../services/service-charge.service';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';
import { MessageboxYesNoComponent } from '../messagebox/messagebox-yes-no.component';

@Component({
  selector: 'app-service-charge',
  templateUrl: './service-charge.component.html',
  styleUrl: './service-charge.component.css'
})
export class ServiceChargeComponent implements AfterViewInit{
  title = 'ServiceApplication';
  serviceChargeForm!:FormGroup;
  submitted = false;
  editMode:boolean= false;
  selectedServiceChargeId:number=0;
  modifiedBy:number = 0;
  createdBy:number = 0;

  public allServiceCharges:ServiceChargeDetails[] = [];
  dataSource!: MatTableDataSource<ServiceChargeDetails>;
  posts:any;
  public displayedColumns: string[] =['actions', 'serviceLocation', 'serviceCharges', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', ];
   
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private serviceChargeService:ServiceChargeService, private formBuilder:FormBuilder, 
    private messageboxOk:MessageboxOkComponent, private confirmMessagebox:MessageboxYesNoComponent  ){
    
    if (typeof localStorage !== 'undefined')
    {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.modifiedBy = Number(localStorage.getItem('userId'));
    }

     this.serviceChargeForm = this.formBuilder.group({
      location:['',Validators.required],
      cost:['',[Validators.required, Validators.maxLength(10)]],
      isDeleted:['',Validators.required] 
    })
  }
  
  ngOnInit() : void{
  }

  get valid() {
    return this.serviceChargeForm.controls;
  }

  resetForm(){
    this.serviceChargeForm.reset();
  } 

  deleteServiceCharge(id:number){
    this.confirmMessagebox.openDialog('0ms', '0ms', 'Are you sure to delete this service charge..?', 'Confirmation');

    this.confirmMessagebox.dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes')
      {
        this.serviceChargeService.deleteServiceCharge(id, this.modifiedBy).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'Service Charge Deleted Successfully !')
          {
            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                this.serviceChargeForm.reset();
                setTimeout(() => this.formGroupDirective.resetForm(), 0)

                this.getAllServiceCharges();
              }
            });

            // alert(resultData);
            // this.serviceChargeForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllServiceCharges();
          }
        });
      }
      });
  }

  updateServiceCharge(id:number){
    // let selectedProduct = this.allProducts.find(p => p.id = id);

    let selectedServiceCharge = this.allServiceCharges.find((p: any) => {
      return p.id == id
    });

    this.selectedServiceChargeId = id;
    this.editMode = true;
    this.serviceChargeForm.patchValue({
      id: selectedServiceCharge?.id,
      location:selectedServiceCharge?.location,
      cost:selectedServiceCharge?.cost,
      isDeleted:selectedServiceCharge?.isDeleted
    });
  }

  addServiceCharge(charge:ServiceCharge){
    this.submitted = true;
    charge.createdBy = this.createdBy;
    charge.modifiedBy = this.modifiedBy;
    if(this.serviceChargeForm.invalid){
      return;
    }
    else{
      if (this.serviceChargeForm.valid) {
      if(this.editMode && this.selectedServiceChargeId > 0){
        charge.id = this.selectedServiceChargeId;
        this.serviceChargeService.updateServiceCharge(charge).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'Service Charge Updated Successfully !'){

            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                this.serviceChargeForm.reset();
                setTimeout(() => this.formGroupDirective.resetForm(), 0)

                this.getAllServiceCharges();
              }
            });

            // alert(resultData);
          
            // this.serviceChargeForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllServiceCharges();
          }
        });
      }
      else
      {
            if(this.allServiceCharges.some(x => x.location.toLowerCase() === charge.location.toLowerCase()))
            {
              // alert("Location charge already exist");
              this.messageboxOk.openDialog('0ms', '0ms', 'Location charge already exist', 'Information');
              return;
            }
                this.serviceChargeService.saveServiceCharge(charge).subscribe(result =>{
                var resultData = Object.values(result)[0];
                if(resultData == 'Service Charge Saved Successfully !')
                {
                  this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
                  this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
                    if(result == 'Ok'){
                      this.getAllServiceCharges();
                      this.serviceChargeForm.reset();
                      setTimeout(() => this.formGroupDirective.resetForm(), 0)
                    }
                  });

                  // alert(resultData);
                  // this.getAllServiceCharges();
                  // this.serviceChargeForm.reset();
                  // setTimeout(() => 
                  // this.formGroupDirective.resetForm(), 0)
                }
              });
        }
      }
    }
  }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.getAllServiceCharges();
  }
  
  getAllServiceCharges(){
    this.serviceChargeService.getAllServiceCharges().subscribe(data =>{
      // console.table(data);
      this.allServiceCharges = data;
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(data);
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
