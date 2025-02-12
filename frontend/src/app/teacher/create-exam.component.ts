import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule],
  template: `
  <br>
   <button [routerLink]="'/teacher'">Back</button>
    <h2>Create Exam</h2>
    <form [formGroup]="examForm" (ngSubmit)="createExam()">
      <input formControlName="name" placeholder="Exam Name" required>
      <input formControlName="start_time" type="datetime-local" required>
      <input formControlName="end_time" type="datetime-local" required>
      <input formControlName="duration" type="number" placeholder="Duration (minutes)" required>

      <h3>Select Questions</h3>
      <div *ngFor="let question of questions">
      <label>
      <input type="checkbox" [value]="question.id" (change)="toggleQuestionSelection(question.id)">
       {{ question.question }} (ID: {{ question.id }})
      </label>
    </div>    

      <button type="submit" [disabled]="examForm.invalid">Create Exam</button>
    </form>
    <br>
    <button [routerLink]="'/teacher/stats'">See the stats of exams</button>
    `
})
export class CreateExamComponent implements OnInit {
  examForm = new FormGroup({
    name: new FormControl('', Validators.required),
    start_time: new FormControl('', Validators.required),
    end_time: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required, Validators.min(1)])
  });

  questions: any[] = [];
  selectedQuestionIds: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.apiService.getQuestions().subscribe((data: any) => {
      this.questions = data;
    });
  }

  toggleQuestionSelection(questionId: number) {
    const idStr = questionId.toString();
    if (this.selectedQuestionIds.includes(idStr)) {
      this.selectedQuestionIds = this.selectedQuestionIds.filter(id => id !== idStr);
    } else {
      this.selectedQuestionIds.push(idStr);
    }
    console.log("Selected Question IDs:", this.selectedQuestionIds);
  }

  createExam() {
    const formData = {
      ...this.examForm.value,
      question_ids: this.selectedQuestionIds.map(id => Number(id)) // Convert to numbers if needed
    };

    console.log("Submitting Exam Data:", JSON.stringify(formData, null, 2));

    this.apiService.createExam(formData).subscribe(
      (response) => {
        console.log("Exam created successfully", response);
        alert("Exam created successfully");
      },
      (error) => {
        console.error("Error creating exam", error);
        alert("Failed to create exam. Check console for errors.");
      }
    );
  }
}
