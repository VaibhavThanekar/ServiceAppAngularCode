import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
userName:any;

constructor(){
  
}

ngOnInit() {
  this.userName = 'Vaibhav';
  // this.userName = sessionStorage.getItem('userName');
 
  // this.userName =  sessionStorage.getItem('userName')?.toString();
  // console.log(this.userName.toString());
  // alert(this.userName);
}

}
