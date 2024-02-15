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

  export interface ProductNameList{
    id: number;
    productName: string;
  }