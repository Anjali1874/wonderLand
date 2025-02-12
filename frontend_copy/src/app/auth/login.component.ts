import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
      Email : 
      <input formControlName="email" placeholder="Email" required>
      <br><br>
      Password : 
      <input type="password" formControlName="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <br><br>
    Not registered?
    <button>Not registered? Register</button>
    
  `
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if(res.token != ''){
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId);
        console.log(res);
        res.role === 'student' ? this.router.navigate(['/student']) : this.router.navigate(['/teacher']);

      }
    });
  }
}
