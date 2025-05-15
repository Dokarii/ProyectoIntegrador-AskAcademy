import { Form, FormResponse, Question } from '../types';
import { 
  deleteForm, 
  getFormById, 
  getFormsBySubject, 
  getFormsByTeacher, 
  getResponsesByForm, 
  getResponsesByStudent,
  getStudentResponseToForm,
  saveForm, 
  saveFormResponse 
} from './storageService';

// Re-export functions from storageService
export {
  getFormsBySubject,
  getFormsByTeacher,
  getStudentResponseToForm
};

// Form CRUD operations
export const createForm = (title: string, subject: string, teacherId: string): Form => {
  const newForm: Form = {
    id: `form_${Date.now()}`,
    title,
    subject,
    createdBy: teacherId,
    questions: []
  };
  
  saveForm(newForm);
  return newForm;
};

export const updateForm = (form: Form): Form => {
  saveForm(form);
  return form;
};

export const removeForm = (formId: string): void => {
  deleteForm(formId);
};

export const getForm = (formId: string): Form | undefined => {
  return getFormById(formId);
};

export const getTeacherForms = (teacherId: string): Form[] => {
  return getFormsByTeacher(teacherId);
};

export const getSubjectForms = (subjectId: string): Form[] => {
  return getFormsBySubject(subjectId);
};

// Question operations
export const addQuestion = (formId: string, question: Question): Form | undefined => {
  const form = getFormById(formId);
  if (!form) return undefined;
  
  form.questions.push(question);
  saveForm(form);
  
  return form;
};

export const updateQuestion = (formId: string, questionId: string, updatedQuestion: Question): Form | undefined => {
  const form = getFormById(formId);
  if (!form) return undefined;
  
  const questionIndex = form.questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return undefined;
  
  form.questions[questionIndex] = updatedQuestion;
  saveForm(form);
  
  return form;
};

export const removeQuestion = (formId: string, questionId: string): Form | undefined => {
  const form = getFormById(formId);
  if (!form) return undefined;
  
  form.questions = form.questions.filter(q => q.id !== questionId);
  saveForm(form);
  
  return form;
};

// Form response operations
export const submitFormResponse = (formId: string, studentId: string, answers: number[]): FormResponse | undefined => {
  const form = getFormById(formId);
  if (!form) return undefined;
  
  // Calculate score
  let correctCount = 0;
  for (let i = 0; i < form.questions.length; i++) {
    if (answers[i] === form.questions[i].correctAnswer) {
      correctCount++;
    }
  }
  
  const score = form.questions.length > 0 
    ? (correctCount / form.questions.length) * 100 
    : 0;
  
  const response: FormResponse = {
    id: `response_${Date.now()}`,
    formId,
    studentId,
    answers,
    submittedAt: new Date().toISOString(),
    score
  };
  
  saveFormResponse(response);
  return response;
};

export const getFormResults = (formId: string): FormResponse[] => {
  return getResponsesByForm(formId);
};

export const getStudentResults = (studentId: string): FormResponse[] => {
  return getResponsesByStudent(studentId);
};

export const hasStudentSubmittedForm = (formId: string, studentId: string): boolean => {
  return !!getStudentResponseToForm(formId, studentId);
};