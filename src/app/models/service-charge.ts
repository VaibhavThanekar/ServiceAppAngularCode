export interface ServiceCharge {
    id: number;
    location: string;
    cost: number;
    isDeleted:boolean;
    createdDate: string;
    createdBy:number;
    modifiedBy:number;
  }

  export interface ServiceChargeDetails {
    id: number;
    location: string;
    cost: number;
    isDeleted:boolean;
    createdBy:string;
    createdDate: string;
    modifiedBy:string;
    modifiedDate: string;
  }