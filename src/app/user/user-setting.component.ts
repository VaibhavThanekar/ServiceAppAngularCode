import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {UserDepartment, UserMaster, UserMasterDetails, UserRole} from '../models/user'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css'
})
export class UserSettingComponent {
  userSettingsForm!:FormGroup;
  submitted = false;
  editMode:boolean= false;
  selectedUserId:number=0;
  userName:any;
  currentPassword:any;
  modifiedBy:number = 0;
  createdBy:number = 0;
  posts:any;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private userService:UserService, private formBuilder:FormBuilder, private router:Router){
    
    if (typeof localStorage !== 'undefined')
    {
      this.createdBy = Number(localStorage.getItem('userId'));
      this.modifiedBy = Number(localStorage.getItem('userId'));
      this.selectedUserId = Number(localStorage.getItem('userId'));
      this.userName = localStorage.getItem('userName');
      this.currentPassword = localStorage.getItem('password');
    }

     this.userSettingsForm = this.formBuilder.group({
      name :[''],
      password :[''],
      newPassword :['',Validators.required],
      confirmPassword :['',Validators.required],
    })

    this.userSettingsForm.patchValue({
      // id: this.selectedUserId,
      name:this.userName
    });
  }

  updateUserPassword(user:any){
    this.submitted = true;
    user.id = this.selectedUserId;
    user.modifiedBy = this.modifiedBy;
   

    if(this.userSettingsForm.invalid){
      return;
    }
    else{
      if (this.userSettingsForm.valid) {
      if(this.selectedUserId > 0){

      if(user.password != this.currentPassword){
        alert('Old password is incorrect');
        return;
      }

      if(user.newPassword != user.confirmPassword){
        alert('Confirm password is not matching with new password');
        return;
      }

        user.id = this.selectedUserId;
        this.userService.updateUserPassword(user.id, user.newPassword, user.modifiedBy).subscribe(result =>{
          var resultData = Object.values(result)[0];
          if(resultData = 'User Password Updated Successfully !'){
            var msg = 'Password updated successfully. please login with new password.';
            alert(msg);
          
            if (typeof localStorage !== 'undefined') {
              this.router.navigateByUrl('/Login');
              localStorage.clear();
            }
          }
        });
      }
    }
    }
  }

  get valid() {
    return this.userSettingsForm.controls;
  }

  resetForm(){
    this.userSettingsForm.reset();
    this.editMode = false;
  } 
}
