import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  /** Fetch all available exams */
  getAvailableExams() {
    return this.http.get(`${this.apiUrl}/exams`);
  }

  /** Start an exam attempt */
  startExam(examId: string, token : string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // ✅ Attach token

    return this.http.post(`${this.apiUrl}/exam-attempts/start`, { examId }, { headers });
  }  

  /** Submit an exam attempt */
  submitExam(data: any, token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.post(`${this.apiUrl}/exam-attempts/submit`, data, { headers });
}


  /** Get user's exam results */
  getExamResults() {
    return this.http.get(`${this.apiUrl}/results`);
  }

  /** Create a new exam (for teachers) */
  createExam(examData: any) {
    return this.http.post(`${this.apiUrl}/exams/create`, examData);
  }

  /** Fetch exam statistics */
  getExamStats() {
    return this.http.get(`${this.apiUrl}/exams/`);
  }

  /** Fetch all available questions */
  getQuestions() {
    return this.http.get(`${this.apiUrl}/questions`);
  }

  // get exam question
  getExamQuestions(examId: string) {
    return this.http.get(`${this.apiUrl}/exams/${examId}/questions`);
  }

  
}
