import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  template: `
    <h2>Student Dashboard</h2>
    <button (click)="goTo('exams')">Available Exams</button>
    <button (click)="goTo('attempt')">Start Exam</button>
    <button (click)="goTo('results')">View Results</button>
  `
})
export class StudentDashboardComponent {
  constructor(private router: Router) {}

  goTo(page: string) {
    this.router.navigate([`/student/${page}`]);
  }
}
