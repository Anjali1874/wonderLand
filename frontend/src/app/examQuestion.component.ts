import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './shared/api.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-exam-questions',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor], 
  template: `
    <h2>Exam Questions</h2>
    <div *ngIf="questions.length > 0; else noQuestions">
      <div *ngFor="let question of questions">
        <h3>{{ question.question }}</h3>
        <ul>
          <li *ngFor="let option of question.options">
            <label>
              <input type="radio" [name]="'q' + question.id" [value]="option"
                     (change)="selectAnswer(question.id, option)" />
              {{ option }}
            </label>
          </li>
        </ul>
      </div>
      <button (click)="submit()">Submit Exam</button>
      <p *ngIf="submitted">Your Final Score: {{ score }}/{{ questions.length }}</p> 
    </div>
    <ng-template #noQuestions>
      <p>No questions available for this exam.</p>
    </ng-template>
  `
})
export class ExamQuestionsComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {}; // Stores user's selected answers
  score: number = 0;
  submitted = false;
  examId: string | null = null; // Store the exam ID
  total: number= 0;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  submit() {
    if (!this.examId) return;

    const token = this.authService.getToken(); // Get token from AuthService

    const resultData = {
      examId: this.examId,
      selectedAnswers: this.selectedAnswers,
      score: this.score,
      totalQuest : this.total
    };
    if(token){
    this.apiService.submitExam(resultData, token).subscribe(
      response => {
        console.log('Exam results submitted successfully:', response);
        this.submitted = true;
      },
      error => {
        console.error('Error submitting exam results:', error);
      }
    );
  }
  }

  selectAnswer(questionId: number, selectedOption: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return;

    if (this.selectedAnswers[questionId] === question.correct_answer) {
      this.score--; // Decrease score if previously correct
      this.total++;
    }

    this.selectedAnswers[questionId] = selectedOption;

    if (selectedOption === question.correct_answer) {
      this.score++; // Increase score if new selection is correct
      this.total;
    }
  }

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('examId');
    if (this.examId) {
      this.apiService.getExamQuestions(this.examId).subscribe((data: any) => {
        this.questions = data.questions;
      });
    }
  }
}
