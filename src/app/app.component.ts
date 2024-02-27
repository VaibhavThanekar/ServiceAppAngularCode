import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ServiceApplication';
  
  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor(){
    this.setTimeout();
    this.userInactive.subscribe(() =>{
    // this._cs.logout()
    console.log('user has been inactive for 3s')
    })
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 10000);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    clearTimeout(this.userActivity);
      this.setTimeout();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    clearTimeout(this.userActivity);
      this.setTimeout();
  }

  logout(){

  }
}


