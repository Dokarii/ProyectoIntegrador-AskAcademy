import { FORMS_KEY, RESPONSES_KEY, SAMPLE_FORMS, SAMPLE_USERS, USERS_KEY } from '../utils/constants';
import { Form, FormResponse, User } from '../types';

// Initialize storage with sample data if empty
export const initializeStorage = (): void => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SAMPLE_USERS));
  }
  
  if (!localStorage.getItem(FORMS_KEY)) {
    localStorage.setItem(FORMS_KEY, JSON.stringify(SAMPLE_FORMS));
  }
  
  if (!localStorage.getItem(RESPONSES_KEY)) {
    localStorage.setItem(RESPONSES_KEY, JSON.stringify([]));
  }
};

// Generic get method
export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Generic set method
export const setToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// User specific methods
export const getUsers = (): User[] => {
  return getFromStorage<User>(USERS_KEY);
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  setToStorage(USERS_KEY, users);
};

export const getUserByUsername = (username: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.username === username);
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

// Form specific methods
export const getForms = (): Form[] => {
  return getFromStorage<Form>(FORMS_KEY);
};

export const getFormById = (id: string): Form | undefined => {
  const forms = getForms();
  return forms.find(form => form.id === id);
};

export const getFormsBySubject = (subjectId: string): Form[] => {
  const forms = getForms();
  return forms.filter(form => form.subject === subjectId);
};

export const getFormsByTeacher = (teacherId: string): Form[] => {
  const forms = getForms();
  return forms.filter(form => form.createdBy === teacherId);
};

export const saveForm = (form: Form): void => {
  const forms = getForms();
  const index = forms.findIndex(f => f.id === form.id);
  
  if (index !== -1) {
    forms[index] = form;
  } else {
    forms.push(form);
  }
  
  setToStorage(FORMS_KEY, forms);
};

export const deleteForm = (id: string): void => {
  const forms = getForms();
  const updatedForms = forms.filter(form => form.id !== id);
  setToStorage(FORMS_KEY, updatedForms);
};

// Form response methods
export const getFormResponses = (): FormResponse[] => {
  return getFromStorage<FormResponse>(RESPONSES_KEY);
};

export const getResponsesByForm = (formId: string): FormResponse[] => {
  const responses = getFormResponses();
  return responses.filter(response => response.formId === formId);
};

export const getResponsesByStudent = (studentId: string): FormResponse[] => {
  const responses = getFormResponses();
  return responses.filter(response => response.studentId === studentId);
};

export const getStudentResponseToForm = (formId: string, studentId: string): FormResponse | undefined => {
  const responses = getFormResponses();
  return responses.find(response => response.formId === formId && response.studentId === studentId);
};

export const saveFormResponse = (response: FormResponse): void => {
  const responses = getFormResponses();
  const index = responses.findIndex(r => r.id === response.id);
  
  if (index !== -1) {
    responses[index] = response;
  } else {
    responses.push(response);
  }
  
  setToStorage(RESPONSES_KEY, responses);
};