export interface ProductMaster {
    id: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    isDeleted:boolean;
    createdDate: string;
    createdBy:number;
    modifiedBy:number;
  }

  export interface ProductMasterDetails {
    id: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    isDeleted:boolean;
    createdBy:string;
    createdDate: string;
    modifiedBy:string;
    modifiedDate: string;
  }

  export interface ProductNameList{
    id: number;
    productName: string;
  }