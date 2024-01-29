export interface Customer {
    id: number;
    customerName: string;
    emailId: string;
    mobileNumber: string;
    address: string;
    isDeleted:boolean;
    createdDate: string;
    createdBy:number;
    modifiedBy:number;
  }

  export interface CustomerNames
  {
    id: number;
    customerName: string;
  }