import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Exam Results</h2>
    <ul>
      <li *ngFor="let result of results">
        Exam: {{ result.examName }} - Score: {{ result.score }}
      </li>
    </ul>
  `
})
export class ExamResultComponent implements OnInit {
  results: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getExamResults().subscribe((data: any) => {
      this.results = data;
    });
  }
}
