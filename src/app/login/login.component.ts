import { Component } from '@angular/core';
import { UserMaster } from '../models/user';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageboxOkComponent } from '../messagebox/messagebox-ok.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  public userDetails: any;
  submitted = false;
  _emailID:string;
  _password:string;
  login=true;

  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private router: Router,private spinner: NgxSpinnerService, private messageboxOk:MessageboxOkComponent ){
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

      this.loginService.getUserDetailsForLogin( this._emailID, this._password).subscribe((data:any) => {
        if(data){
          if(!data.isDeleted)
          {
            // alert('Login Successful')
            // sessionStorage.setItem('login', 'Success');
            //   sessionStorage.setItem('emailId', this.userDetails[0].emailId);
            //   sessionStorage.setItem('userName', this.userDetails[0].name);
            //   sessionStorage.setItem('department', this.userDetails[0].department);
            //   sessionStorage.setItem('role', this.userDetails[0].role);

           
              localStorage.setItem('login', 'Success');
              localStorage.setItem('userId', data.id.toString());
              localStorage.setItem('emailId', data.emailId);
              localStorage.setItem('mobileNumber', data.mobileNo);
              localStorage.setItem('userName', data.name);
              localStorage.setItem('password', data.password);
              localStorage.setItem('department', data.department);
              localStorage.setItem('role', data.role);
              localStorage.setItem('token', data.token);
               
            this.spinner.show();
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
              // this.router.navigate(['/Dashboard'])
              
              this.router.navigateByUrl('/Dashboard');

            }, 5000);

            // this.router.navigate(['/dashboard'])
          }
          else{
            sessionStorage.setItem('login', 'Fail');
            this.login = false;
            // alert('User does not exist')
            this.messageboxOk.openDialog('300ms', '100ms', 'User does not exist', 'Information');
          }
      }
      else{
        sessionStorage.setItem('login', 'Fail');
        // alert('Invalid EmailId or Password')
        this.messageboxOk.openDialog('300ms', '100ms', 'Invalid EmailId or Password', 'Information');
      }
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
