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
    otherCharge:number;
    fileName:string;
    quatationPath:string;
    isPartReplaced:boolean;
    partDetails:string;
    partCost:number;
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
    isProductInWarranty:string;
    customerComplaint:string;
    serviceChargeId:number;
    serviceLocation:string;
    serviceCost:string;
    otherCharge:number;
    fileName:string;
    quatationPath:string;
    isPartReplaced:boolean;
    partDetails:string;
    partCost:number;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    currentStatusId:number;
    currentStatus:string;
    otherStatus:string;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }

  export interface CustomerServiceDetailsReportParm
  {
    fromDate:string;
    toDate:string;
    servicePersonId:number;
  }

  export interface PreviousReminderDetailsReportParm
  {
    fromDate:string;
    toDate:string;
    cutomerId:number;
    userId:number;
    department:number;
  }

  export interface CustomerServiceQutationUpload
  {
      id:number;
      fileName:string;
      sourcePath:string;
  }


  

