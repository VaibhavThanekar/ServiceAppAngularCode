export interface ReminderMaster {
    id:number;
    description:string;
    department:string;
    reminderDateTime: string;
    isActive:boolean;
    createdDate: string;
    createdBy:number;
    modifiedBy:number;
    modifiedDate:string;
  }

  export interface ReminderMasterList {
    id:number;
    customerName:string;
    description:string;
    department:string;
    visitedDate:string;
    reminderDateTime: string;
    isActive:boolean;
    createdBy:string;
    createdDate: string;
    modifiedBy:string;
    modifiedDate:string;
  }

  export interface AdditionalReminder {
    customerId:number;
    reminderId:number;
    department:string;
    additionalDays:number;
    additionalRemark: string;
    isActive:boolean;
    createdBy:number;
  }
