import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ProductMaster, ProductMasterDetails} from '../models/product'
import { ProductService } from '../services/product.service'
import { MatInput } from '@angular/material/input';
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';
import { MessageboxYesNoComponent } from '../messagebox/messagebox-yes-no.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements AfterViewInit {
  title = 'ServiceApplication';
  prdouctForm!:FormGroup;
  submitted = false;
  editMode:boolean= false;
  selectedProductId:number=0;
  modifiedBy:number = 0;
  createdBy:number = 0;

  public allProducts:ProductMasterDetails[] = [];
  dataSource!: MatTableDataSource<ProductMasterDetails>;
  posts:any;
  public displayedColumns: string[] =['actions', 'productName', 'productPrice', 'productDescription', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', ];
   
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private productService:ProductService, private formBuilder:FormBuilder, 
    private messageboxOk:MessageboxOkComponent, private confirmMessagebox:MessageboxYesNoComponent  ){
    if (typeof localStorage !== 'undefined')
    {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.modifiedBy = Number(localStorage.getItem('userId'));
    }

     this.prdouctForm = this.formBuilder.group({
      productName:['',Validators.required],
      productPrice:['',[Validators.required, Validators.maxLength(10)]],
      productIsDeleted:['',Validators.required],
      productDescription:['']
    })
  }
  
  ngOnInit() : void{
    // Validations
    // this.prdouctForm = this.formBuilder.group({
    //   productName:['',Validators.required],
    //   productPrice:['',[Validators.required, Validators.maxLength(10)]],
    //   productIsDeleted:['',Validators.required],
    //   productDescription:['']
    // })
  }

  get valid() {
    return this.prdouctForm.controls;
  }

  resetForm(){
    this.prdouctForm.reset();
  } 

  deleteProduct(id:number){
    this.confirmMessagebox.openDialog('0ms', '0ms', 'Are you sure to delete this product..?', 'Confirmation');

    this.confirmMessagebox.dialogRef.afterClosed().subscribe(result => {
      if(result == 'Yes')
      {
        this.productService.deleteProduct(id, this.modifiedBy).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'Product Deleted Successfully !')
          {
            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                this.prdouctForm.reset();
                setTimeout(() => this.formGroupDirective.resetForm(), 0)

                this.getAllProducts();
              }
            });

            // alert(resultData);
            // this.prdouctForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllProducts();
          }
        });
      }
      });
  }

  updateProduct(id:number){
    // let selectedProduct = this.allProducts.find(p => p.id = id);

    let selectedProduct = this.allProducts.find((p: any) => {
      return p.id == id
    });

    this.selectedProductId = id;
    this.editMode = true;
    this.prdouctForm.patchValue({
      id: selectedProduct?.id,
      productName:selectedProduct?.productName,
      productDescription:selectedProduct?.productDescription,
      productPrice:selectedProduct?.productPrice,
      productIsDeleted:selectedProduct?.isDeleted 
    });
  }

  @ViewChild('productName') inputProductName: MatInput;
  addProduct(product:ProductMaster){
    this.submitted = true;
    product.modifiedBy = this.modifiedBy;

    if(this.prdouctForm.invalid){
      return;
    }
    else{
      if (this.prdouctForm.valid) {
      if(this.editMode && this.selectedProductId > 0){
        product.id = this.selectedProductId;
        this.productService.updateProduct(product).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'Product Updated Successfully !'){

            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                  this.prdouctForm.reset();
                  setTimeout(() => this.formGroupDirective.resetForm(), 0)
                  this.getAllProducts();
              }
            });

            // alert(resultData);
          
            // this.prdouctForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllProducts();
          }
        });
      }
      else
      {
              if(this.allProducts.some(x => x.productName.toLowerCase() === product.productName.toLowerCase()))
              {
                // alert("Product name already exist");
                this.messageboxOk.openDialog('0ms', '0ms', 'Product name already exist', 'Information');
                return;
              }
              
                product.createdBy = this.createdBy;
                this.productService.saveProduct(product).subscribe(result =>{
                  var resultData = Object.values(result)[0];
                  if(resultData == 'Product Saved Successfully !'){

                    this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
                    this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
                      if(result == 'Ok'){
                          this.getAllProducts();
                          this.prdouctForm.reset();
                          setTimeout(() => this.formGroupDirective.resetForm(), 0)
                      }
                    });

                  //   alert(resultData);
                  //   this.getAllProducts();
                  // this.prdouctForm.reset();
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
    this.getAllProducts();
    // // this.dataSource.paginator = this.paginator;
    // // this.dataSource.sort = this.sort;
  }
  
  getAllProducts(){
    this.productService.getAllProducts().subscribe(data =>{
      // console.table(data);
      this.allProducts = data;
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
