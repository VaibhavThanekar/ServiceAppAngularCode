import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {UserDepartment, UserMaster, UserMasterDetails, UserRole} from '../models/user'
import { UserService } from '../services/user.service'
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userForm!:FormGroup;
  submitted = false;
  editMode:boolean= false;
  selectedUserId:number=0;
  modifiedBy:number = 0;
  createdBy:number = 0;

  public allUserDetails:UserMasterDetails[] = [];
  dataSource!: MatTableDataSource<UserMasterDetails>;
  posts:any;
  public departmentList: UserDepartment[];
  public roleList: UserRole[];

  public selectedDepartment: number;
  public selectedRole: number;

  public displayedColumns: string[] =['actions', 'name', 'emailId', 'mobileNo', 'password', 'department',
  'role', 'remarks',  'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate', ];
   
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private userService:UserService, private formBuilder:FormBuilder, private messageboxOk:MessageboxOkComponent ){
    
    if (typeof localStorage !== 'undefined')
    {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.modifiedBy = Number(localStorage.getItem('userId'));
    }

     this.userForm = this.formBuilder.group({
      name :['',Validators.required],
      emailId :['',Validators.required],
      departmentId :['',Validators.required],
      mobileNo  :['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password :['',Validators.required],
      roleId :['',Validators.required],
      remarks :[''],
    })
  }
  
  ngOnInit() : void{
  }

  get valid() {
    return this.userForm.controls;
  }

  resetForm(){
    this.userForm.reset();
    this.editMode = false;
  } 

  deleteUser(id:number){
      if(confirm('Are you sure to delete this user..?')){
        this.userService.deleteUser(id, this.modifiedBy).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'User Deleted Successfully !')
          {
            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                  this.userForm.reset();
                  setTimeout(() => this.formGroupDirective.resetForm(), 0)
                  this.getAllUserDetails();
              }
            });

            // alert(resultData);
            // this.userForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllUserDetails();
          }
        });
    }
  }

  updateUser(id:number){
    // let selectedProduct = this.allProducts.find(p => p.id = id);

    let selectedUser = this.allUserDetails.find((p: any) => {
      return p.id == id
    });

    this.selectedUserId = id;
    this.editMode = true;
    this.userForm.patchValue({
      id: selectedUser?.id,
      name:selectedUser?.name,
      emailId:selectedUser?.emailId,
      mobileNo:selectedUser?.mobileNo,
      password:selectedUser?.password,
      department:selectedUser?.department,
      departmentId:this.departmentList.find(x => x.department == selectedUser?.department)?.id,
      role:selectedUser?.role,
      roleId:this.roleList.find(x => x.role == selectedUser?.role)?.id,
      remarks:selectedUser?.remarks,
      isDeleted:selectedUser?.isDeleted
    });
  }

  addUser(user:UserMaster){
    this.submitted = true;
    user.createdBy = this.createdBy;
    user.modifiedBy = this.modifiedBy;
    user.mobileNo = user.mobileNo.toString();
    user.remarks = user.remarks;
    if(this.userForm.invalid){
      return;
    }
    else{
      if (this.userForm.valid) {
      if(this.editMode && this.selectedUserId > 0){
        user.id = this.selectedUserId;
        this.userService.updateUser(user).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData == 'User Updated Successfully !'){

            this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
            this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
              if(result == 'Ok'){
                  this.userForm.reset();
                  setTimeout(() => this.formGroupDirective.resetForm(), 0)
                  this.getAllUserDetails();
              }
            });

            // alert(resultData);
          
            // this.userForm.reset();
            // setTimeout(() => 
            // this.formGroupDirective.resetForm(), 0)

            // this.getAllUserDetails();
          }
        });
      }
      else
      {
            if(this.allUserDetails.some(x => x.name.toLowerCase() === user.name.toLowerCase()))
            {
              // alert("User already exist");
              this.messageboxOk.openDialog('0ms', '0ms', 'User already exist', 'Information');
              return;
            }
                this.userService.saveUser(user).subscribe(result =>{
                var resultData = Object.values(result)[0];
                if(resultData = 'User Saved Successfully !')
                {

                  this.messageboxOk.openDialog('0ms', '0ms', resultData, 'Information');
    
                  this.messageboxOk.dialogRef.afterClosed().subscribe(result => {
                    if(result == 'Ok'){
                        this.getAllUserDetails();
                        this.userForm.reset();
                        setTimeout(() => this.formGroupDirective.resetForm(), 0)
                    }
                  });

                  //   alert(resultData);
                  //   this.getAllUserDetails();
                  // this.userForm.reset();
                  // setTimeout(() => 
                  // this.formGroupDirective.resetForm(), 0)
                }
              });
        }
      }
    }
  }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
   this.getAllUserDetails();
   this.loadDropdowns();
  }
  
  getAllUserDetails(){
    this.userService.getAllUserDetails().subscribe(data =>{
      // console.table(data);
      this.allUserDetails = data;
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(data);
    })
  }

  private loadDropdowns() {
   
    this.userService.getAllUserDepatments().subscribe(data => {
      this.departmentList = data;
    })

    this.userService.getAllUserRoles().subscribe(data => {
      this.roleList = data;
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
