import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { StudentDashboardComponent } from './student/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard.component';
import { AvailableExamsComponent } from './student/available-exams.component';
import { ExamAttemptComponent } from './student/exam-attempt.component';
import { ExamResultComponent } from './student/exam-result.component';
import { CreateExamComponent } from './teacher/create-exam.component';
import { ExamStatsComponent } from './teacher/exam-stats.component';
import { AuthGuard } from './shared/auth.guard';
import { ExamQuestionsComponent } from './examQuestion.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Student Routes
  { path: 'student', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'student/exams', component: AvailableExamsComponent, canActivate: [AuthGuard] },
  { path: 'student/exam-attempt/:examId', component: ExamAttemptComponent, canActivate: [AuthGuard] },
  { path: 'student/results', component: ExamResultComponent, canActivate: [AuthGuard] },

  // Teacher Routes
  { path: 'teacher', component: TeacherDashboardComponent, canActivate: [AuthGuard] },
  { path: 'teacher/create', component: CreateExamComponent, canActivate: [AuthGuard] },
  { path: 'teacher/stats', component: ExamStatsComponent, canActivate: [AuthGuard] },
  { path: 'exam-questions/:examId', component: ExamQuestionsComponent },


  { path: '**', redirectTo: '' }

];
