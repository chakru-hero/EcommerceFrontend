import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }
  
  getAllCookies():any{
    return this.cookieService.getAll();
  }

  getCookie(cookie:string):string{
    return this.cookieService.get(cookie);
  }

  setCookie(response:HttpResponse<any>):void{
    var res = JSON.stringify(response);
    const obj = JSON.parse(res);
    this.cookieService.set("user",obj.body.email);
    this.cookieService.set("token",obj.body.token);
    this.cookieService.set("username",obj.body.username);
  }

}
