import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onRegister()">
      <input formControlName="name" placeholder="Full Name" required>
      <input formControlName="email" placeholder="Email" required>
      <input type="password" formControlName="password" placeholder="Password" required>
      <select formControlName="role">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('student')
  });

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
