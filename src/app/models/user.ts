
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
    remarks:string;
    createdBy:number;
    createdDate:string;
    modifiedBy:number;
    modifiedDate:string;
    isDeleted:boolean;
  }

  export interface UserMasterDetails
  {
    id:number;
    emailId:string;
    name:string;
    department:string;
    mobileNo:string;
    password:string;
    role:string;
    // token:string;
    remarks:string;
    createdBy:string;
    createdDate:string;
    modifiedBy:string;
    modifiedDate:string;
    isDeleted:boolean;
  }

  export interface UserName
  {
    id:number;
    name:string;
  }

  export interface UserDepartment
  {
    id:number;
    department:string;
  }

  export interface UserRole
  {
    id:number;
    role:string;
  }

