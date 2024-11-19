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
    fileName:string;
    quatationPath:string;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
    isOrderClosed:boolean;
    orderCloseDate:string;
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
    reminderId:number;
    reminderDate:string;
    productId:number;
    product:string
    remark:string;
    comment:string;
    fileName:string;
    quatationPath:string;
    isSMSSentToCustomer:boolean;
    isSMSSentToManager:boolean;
    createdDate:string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
    isOrderClosed:string;
    orderCloseDate:string;
  }

  export interface CustomerSalesDetailsReportParm
  {
    fromDate:string;
    toDate:string;
    salesPersonId:number;
    productId:number
  }

  export interface CustomerQutationUpload
  {
      id:number;
      fileName:string;
      sourcePath:string;
  }

  
  export class CustomerQutationUpload
  {
      id:number;
      fileName:string;
      sourcePath:string;

      constructor(data: Partial<CustomerQutationUpload>) {
        Object.assign(this, data);
    }
  }