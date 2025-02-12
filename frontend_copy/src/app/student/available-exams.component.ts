import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-available-exams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Available Exams</h2>
    <ul>
      <li *ngFor="let exam of exams">
        {{ exam.name }} 
        <button (click)="startExam(exam.id)">Start</button>
      </li>
    </ul>
  `
})
export class AvailableExamsComponent implements OnInit {
  exams: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}  

  ngOnInit() {
    this.apiService.getAvailableExams().subscribe((data: any) => {
      this.exams = data;
    });
  }

  startExam(examId: string) {
    this.router.navigate([`student/exam-attempt/${examId}`]);  
  }
}
