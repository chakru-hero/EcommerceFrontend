import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Signup } from 'src/app/models/signup.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  loginHttpService(login:Login): Observable<HttpResponse<any>>{
    return this.httpClient.post<HttpResponse<any>>(
      `${environment.apiSpringUrl}/user/login`,login,
      {observe:'response'}
    )
  }
  
  signupHttpService(signup:Signup):Observable<HttpResponse<any>>{
    return this.httpClient.post<HttpResponse<any>>(
      `${environment.apiSpringUrl}/user/signup`,signup,
      {observe:'response'}
    )
  }
}
