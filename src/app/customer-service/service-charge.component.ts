import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ServiceCharge} from '../models/service-charge'
import { ProductService } from '../services/product.service'
import { ServiceChargeService } from '../services/service-charge.service';

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

  public allServiceCharges:ServiceCharge[] = [];
  dataSource!: MatTableDataSource<ServiceCharge>;
  posts:any;
  public displayedColumns: string[] =['Id', 'serviceLocation', 'serviceCharges', 'createdDate', 'actions'];
   
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private serviceChargeService:ServiceChargeService, private formBuilder:FormBuilder){
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
   
      if(confirm('Are you sure to delete this service charge..?')){
        this.serviceChargeService.deleteServiceCharge(id).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData = 'Service Charge Deleted Successfully !')
          {
            alert(resultData);
            this.serviceChargeForm.reset();
            
            setTimeout(() => this.formGroupDirective.resetForm(), 0)

            this.getAllServiceCharges();
          }
        });
    }
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
      isDeleted:selectedServiceCharge?.isDeleted,
      createdBy:0,
      modifiedBy:0,
    });
  }

  addServiceCharge(charge:ServiceCharge){
    this.submitted = true;
    charge.createdBy = 0;
    charge.modifiedBy = 0;
    if(this.serviceChargeForm.invalid){
      return;
    }
    else{
      if (this.serviceChargeForm.valid) {
      if(this.editMode && this.selectedServiceChargeId > 0){
        charge.id = this.selectedServiceChargeId;
        this.serviceChargeService.updateServiceCharge(charge).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData = 'Service Charge Updated Successfully !'){
            alert(resultData);
          
            this.serviceChargeForm.reset();
            setTimeout(() => 
            this.formGroupDirective.resetForm(), 0)

            this.getAllServiceCharges();
          }
        });
      }
      else
      {
            if(this.allServiceCharges.some(x => x.location.toLowerCase() === charge.location.toLowerCase()))
            {
              alert("Location charge already exist");
              return;
            }
                this.serviceChargeService.saveServiceCharge(charge).subscribe(result =>{
                var resultData = Object.values(result)[0];
                if(resultData = 'Service Charge Saved Successfully !')
                {
                  alert(resultData);
                  this.getAllServiceCharges();
                this.serviceChargeForm.reset();
                setTimeout(() => 
                this.formGroupDirective.resetForm(), 0)
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
