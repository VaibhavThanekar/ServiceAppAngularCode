import { Component } from '@angular/core';
import { UserMaster } from '../models/user';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  public userDetails: UserMaster[];
  submitted = false;
  _emailID:string;
  _password:string;

  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router: Router){
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      })
  }

  ngOnInit() {
    this.getUserLoginDetails();
  }

  get valid() {
    return this.loginForm.controls;
  }

  checkLogin(_userMaster: UserMaster){
    if (this.loginForm.invalid) {
      this.submitted = false
      return;
    }
    else{
     
      this._emailID = _userMaster.emailId.trim();
      this._password =  _userMaster.password.trim();

      this.loginService.getUserDetailsForLogin( this._emailID, this._password).subscribe(data => {
        if(data && data.length > 0){
          this.userDetails = data;
          if(this.userDetails[0].isDeleted != true){
            // alert('Login Successful')
            this.router.navigate(['/dashboard'])
          }
          else{
            alert('User does not exist')
          }
      }
      else{
        alert('Invalid EmailId or Password')
      }
        // console.log(this.userDetails);
      })
    } 
  }

  getUserLoginDetails() {
    let emailId = "thanekarvaibhav@gmail.com";
    let password = "Vaibhav@59";

    this.loginService.getUserDetailsForLogin(emailId, password).subscribe(data => {
      this.userDetails = data;
      
      
      // console.log(this.userDetails);
    })
    // this.loginService.getUserDetailsForLogin(emailId, password).subscribe(data => {
    //   this.userDetails = data;
    //   console.log(this.userDetails);
    // })
  }
}
