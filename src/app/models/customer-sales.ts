export interface CustomerSales
  {
    id: number;
    customerId:number;
    customerName:string;
    mobileNumber:string;
    customerAddress:string;
    salesPersonId:number;
    visitedDate:string;
    timeOfVisit:string;
    durationOfSaleId:number;
    productId:number;
    remark:string;
    comment:string;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }

  export interface CustomerSalesDetails
  {
    id: number;
    customerName:string;
    mobileNumber:string;
    customerAddress:string;
    salesPerson:string;
    visitedDate:string;
    timeOfVisit:string;
    durationOfSale:string;
    reminderDate:string;
    product:string
    remark:string;
    comment:string;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }

  export interface CustomerSalesDetailsReportParm
  {
    fromDate:string;
    toDate:string;
    salesPersonId:number;
    productId:number
  }

