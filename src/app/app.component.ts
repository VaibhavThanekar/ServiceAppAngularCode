import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ServiceApplication';
  
  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor(private router:Router){
    // console.log('constructor' );
    // this.setTimeout();
    // this.userInactive.subscribe(() =>{
    // // this.logout()
    // console.log('user has been inactive for 3s');
    // })
  }
  ngOnInit(): void {
    // console.log('ngOnInit' );

  //   if(typeof localStorage !== 'undefined')
  //   {
  //     console.log('login', localStorage.getItem('login') );
  //   }
  

  //  if(typeof localStorage !== 'undefined' && localStorage.getItem('login') == 'Success'){
  //   console.log('success', localStorage.getItem('login') );
  //  }

    //    this.setTimeout();
    // this.userInactive.subscribe(() =>{
    // // this.logout()
    // console.log('user has been inactive for 3s');
    // })
  }

  setTimeout() {
    // 60000    1 mint
    // 600000  10 min
    // 900000  15 min

    clearTimeout(this.userActivity);
    
    // time is in Miliseconds.
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
    console.log('user has been inactive after 15 minutes');
    this.userInactive.subscribe(() =>{
    this.logout()
  
    })
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('login') == 'Success')
    {
      // console.log('onMouseMove success', localStorage.getItem('login') );
      this.setTimeout();
    }
    
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(typeof localStorage !== 'undefined' && localStorage.getItem('login') == 'Success')
    {
      // console.log('onKeyDown success', localStorage.getItem('login') );
      this.setTimeout();
    }
  }

  logout():void
  {
    if(typeof localStorage !== 'undefined') 
    {
      localStorage.clear();
      this.router.navigateByUrl('/Login');
    }
  }
}


