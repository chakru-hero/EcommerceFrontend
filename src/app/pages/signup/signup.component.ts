import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private signupService: UserService, private router: Router) {}
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  username: string = '';
  password: string = '';
  //  signupObj : Signup | undefined;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  signup(): void {
    this.signupService
      .signupHttpService({
        email: this.email.value!,
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          if (response.status == 201) {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          alert('try again');
          this.router.navigate(['/signup']);
        },
      });
  }
}
