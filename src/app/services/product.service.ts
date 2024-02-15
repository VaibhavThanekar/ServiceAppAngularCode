import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {ProductMaster} from '../models/product'
import { json } from 'stream/consumers';
import { Constants } from '../models/commonMaster';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly apiURL = Constants.BASE_URL + "ProductMaster/";

  constructor(private http:HttpClient) { }

  getAllProducts(){
   return this.http.get<ProductMaster[]>(this.apiURL+"GetAllProducts");
  }

  saveProduct(product:ProductMaster){
    //alert("Hello");
    return this.http.post(this.apiURL+"AddProduct", product);
    // this.http.post(this.apiURL+'AddProduct', product).subscribe();
    // // this.http.post(this.apiURL+'AddProduct', product).subscribe(data =>{
    // //   alert(data);
    // //   // this.refreshNotes();
    // // })
  }

  deleteProduct(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = {  headers: headers }
  //  return  this.http.delete(this.apiURL+"DeleteProduct?Id="+id);
  return  this.http.post(this.apiURL+"DeleteProduct?Id="+ id,  headers);
  }


  updateProduct(product:ProductMaster){
    return this.http.post(this.apiURL+"UpdateProduct", product);
  }

}
