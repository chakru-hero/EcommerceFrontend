import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from 'src/app/services/config/cookies.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private loginService: UserService,
    private router: Router,
    private cookieService : CookiesService
  ) {}
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
            this.router.navigate(['home']);
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
