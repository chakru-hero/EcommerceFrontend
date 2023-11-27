import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { CookiesService } from 'src/app/services/config/cookies.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
  constructor(
    private loginService: UserService,
    private router: Router,
    private cookieService : CookiesService,
    private appcomponent : AppComponent
  ) {
  }
  ngOnDestroy(): void {
    this.appcomponent.setVisibility(true);
  }
  ngOnInit(): void {
    this.appcomponent.setVisibility(false);
  }
  
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  username: string = '';
  password: string = '';

  login(): void {
    this.loginService
      .loginHttpService({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.cookieService.setCookie(response);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          alert('invalid');
        },
      });
    this.clear();
  }

  clear() {
    this.username = '';
    this.password = '';
    this.hide = true;
  }

  checkLoggedIn(){
    // TO-DO
  }

}
