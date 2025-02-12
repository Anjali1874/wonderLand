import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  template: `
    <h2>Teacher Dashboard</h2>
    <button (click)="goTo('create')">Create Exam</button>
    <button (click)="goTo('stats')">Exam Stats</button>
  `
})
export class TeacherDashboardComponent {
  constructor(private router: Router) {}

  goTo(page: string) {
    this.router.navigate([`/teacher/${page}`]);
  }
}
