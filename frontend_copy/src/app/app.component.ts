import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Online Exam System</h1>
    <nav>
      <button *ngIf="!isLoggedIn" (click)="navigateTo('')">Login</button>
      <button *ngIf="!isLoggedIn" (click)="navigateTo('register')">Register</button>
      <button *ngIf="isLoggedIn" (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
      console.log("Auth Status Updated:", status);
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
      