
export interface UserMaster
  {
    id:number;
    emailId:string;
    name:string;
    departmentId:number;
    department:string;
    mobileNo:string;
    password:string;
    roleId:number;
    role:string;
    token:string;
    createdBy:number;
    createdDate:string;
    modifiedBy:number;
    modifiedDate:string;
    isDeleted:boolean;
  }

  export interface UserName
  {
    id:number;
    name:string;
  }
