export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  subjects?: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Form {
  id: string;
  title: string;
  subject: string;
  createdBy: string;
  questions: Question[];
}

export interface FormResponse {
  id: string;
  formId: string;
  studentId: string;
  answers: number[];
  submittedAt: string;
  score: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
}