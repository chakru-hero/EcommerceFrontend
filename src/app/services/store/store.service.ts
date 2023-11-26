import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/prodct.model';
import { environment } from 'src/environments/environment.development';
import { CookiesService } from '../config/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private httpClient : HttpClient, private cookieService : CookiesService) { }
  
  getAllProducts(limit = '12', sort = 'desc' , category ? : string) : Observable<Array<Product>>{
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.cookieService.getCookie("token")
    );
    return this.httpClient.get<Array<Product>>(
      `${environment.apiSpringUrl}/store/products?sort=${sort}&limit=${limit}&category=${category}`
    , {headers:header})
  }

  getAllCategories():Observable<Array<string>>{
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.cookieService.getCookie("token")
    );
      return this.httpClient.get<Array<string>>(
        `${environment.apiSpringUrl}/store/getAllCategories`
        , {headers:header})  
      }
}
