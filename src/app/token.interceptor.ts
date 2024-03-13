import { HttpErrorResponse, HttpEvent, HttpResponse,HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonService } from './services/common.service';
import { Injectable } from '@angular/core';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  token :any;

  constructor(private _cs:CommonService , private router : Router) {
     this.token =this._cs.getToken()
    // this.token = localStorage.getItem('token');
    console.log(this.token);
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this._cs.getToken(),'token');
    

    if (!request.url.includes('/Login') && this._cs.getToken()) {
      request = request.clone({ 
        setHeaders: {
          Authorization: `Bearer ${this._cs.getToken()}`
        }
      });
    }
    return next.handle(request).pipe(catchError((error:any)=>{
      console.log(error);
      console.log(error.status);
      
      if (error instanceof HttpErrorResponse && (error.status === 0 || error.status === 401)) {
        localStorage.clear()
        this.router.navigateByUrl('/Login');
      }
      return throwError(error);
    }));
  }
}