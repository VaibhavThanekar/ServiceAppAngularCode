import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ServiceCharge, ServiceChargeDetails} from '../models/service-charge'
import { ProductService } from '../services/product.service'
import { ServiceChargeService } from '../services/service-charge.service';
import { Settings, SettingsDetails } from '../models/settings';
import { CommonService } from '../services/common.service';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements AfterViewInit{
  title = 'ServiceApplication';
  settingsForm!:FormGroup;
  submitted = false;
  editMode:boolean= false;
  selectedSettingsId:number=0;
  modifiedBy:number = 0;
  createdBy:number = 0;

  public allSettings:SettingsDetails[] = [];
  dataSource!: MatTableDataSource<SettingsDetails>;
  posts:any;
  public displayedColumns: string[] =['actions', 'waapiToken', 'waMessageURI', 'managerMobile', 
  'serviceTemplateName', 'salesTemplateName', 'salesOrderCloseTemplateName','createdBy', 'createdDate', 'modifiedBy', 
  'modifiedDate', ];
   
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private commonService:CommonService, private formBuilder:FormBuilder, private messageboxOk:MessageboxOkComponent ){
    
    if (typeof localStorage !== 'undefined')
    {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.modifiedBy = Number(localStorage.getItem('userId'));
    }

     this.settingsForm = this.formBuilder.group({
      waapiToken:['',Validators.required],
      waMessageURI:['',Validators.required],
      managerMobile:['',[Validators.required, Validators.maxLength(10)]],
      serviceTemplateName:['',Validators.required],
      salesTemplateName:['',Validators.required],
      salesOrderCloseTemplateName:['', Validators.required]
    })
  }
  
  ngOnInit() : void{
  }

  get valid() {
    return this.settingsForm.controls;
  }

  resetForm(){
    this.settingsForm.reset();
  } 

  updateSettings(id:number){
    // let selectedProduct = this.allProducts.find(p => p.id = id);

    let selectedSettings = this.allSettings.find((p: any) => {
      return p.id == id
    });

    this.selectedSettingsId = id;
    this.editMode = true;
    this.settingsForm.patchValue({
      id: selectedSettings?.id,
      waMessageURI:selectedSettings?.waMessageURI,
      waapiToken:selectedSettings?.waapiToken,
      managerMobile:selectedSettings?.managerMobile,
      serviceTemplateName:selectedSettings?.serviceTemplateName,
      salesTemplateName:selectedSettings?.salesTemplateName,
      salesOrderCloseTemplateName:selectedSettings?.salesOrderCloseTemplateName,
    });
  }

  addSettings(settings:Settings){
    this.submitted = true;
    settings.createdBy = this.createdBy;
    settings.modifiedBy = this.modifiedBy;
    settings.managerMobile = settings.managerMobile.toString();
    settings.salesTemplateName = settings.salesTemplateName;
    settings.serviceTemplateName = settings.serviceTemplateName;
    settings.salesOrderCloseTemplateName = settings.salesOrderCloseTemplateName;
    if(this.settingsForm.invalid){
      return;
    }
    else{
      if (this.settingsForm.valid) {
      if(this.editMode && this.selectedSettingsId > 0){
        settings.id = this.selectedSettingsId;
        this.commonService.updateSetting(settings).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'Settings Updated Successfully !'){

            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                this.settingsForm.reset();
                setTimeout(() => this.formGroupDirective.resetForm(), 0)
                this.getAllSettings();
              }
            });


            // alert(resultData);
          
            // this.settingsForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllSettings();
          }
        });
      }
      }
    }
  }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.getAllSettings();
  }
  
  getAllSettings(){
    this.commonService.getAllSettingDetails().subscribe(data =>{
        // console.table(data);
      this.allSettings = data;
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
