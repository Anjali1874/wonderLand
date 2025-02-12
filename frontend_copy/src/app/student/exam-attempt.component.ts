import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-attempt',
  standalone: true,
  imports: [CommonModule],    
  template: `
    <h2>Attempt Exam</h2>
    <p>Exam ID: {{ examId }}</p>

    <button (click)="startExam()">Start Exam</button>
  `
})
export class ExamAttemptComponent implements OnInit {
  examId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
  }

  startExam() {
        this.router.navigate([`/exam-questions/${this.examId}`]); // Navigate with examId
    };

  }

