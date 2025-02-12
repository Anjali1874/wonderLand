import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-stats',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <br>
    <button [routerLink]="'/teacher'">Back</button>
    <h2>Exam Stats</h2>   
    <ul *ngIf="stats.length > 0; else noData">
      <li *ngFor="let stat of stats">
        <strong>{{ stat.name }}</strong>: {{ stat.attempts    }} attempts
      </li>       
    </ul>
    <ng-template #noData> 
      <p>No exams or attempts found.</p>
    </ng-template>
    <router-outlet></router-outlet>
  `
})
export class ExamStatsComponent implements OnInit {
  stats: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getExamStats().subscribe(
      (data: any) => {
        this.stats = data; 
        console.log(this.stats); 
      },
      (error) => {
        console.error("Error fetching exam stats", error);
      }
    );
  }
}
