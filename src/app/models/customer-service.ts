  export interface ServicePersonList
  {
    id: number;
    name: string;
  }

  export interface ServiceChargeList
  {
    id: number;
    location: string;
    cost: number;
  }

  export interface CurrentStatusList
  {
    id: number;
    status: string;
  }

  export interface CustomerService
  {
    id: number;
    customerId:number;
    customerName:string;
    mobileNumber:string;
    customerAddress:string;
    servicePersonId:number;
    visitedDate:string;
    timeOfVisit:string;
    isProductInWarranty:boolean;
    customerComplaint:string;
    serviceChargeId:number;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    currentStatusId:number;
    otherStatus:string;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }

  export interface CustomerServiceDetails
  {
    id: number;
    customerName:string;
    mobileNumber:string;
    customerAddress:string;
    servicePersonName:string;
    visitedDate:string;
    timeOfVisit:string;
    isProductInWarranty:boolean;
    customerComplaint:string;
    serviceLocation:string;
    serviceCost:string;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    currentStatus:string;
    otherStatus:string;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }


  

