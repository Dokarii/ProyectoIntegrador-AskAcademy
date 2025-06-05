import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';

import Home from '../pages/Home';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import FormCreate from '../pages/FormCreate';
import FormEdit from '../pages/FormEdit';
import FormView from '../pages/FormView';
import FormResults from '../pages/FormResults';
import Subject from '../pages/Subject';

const DashboardRedirect = () => {
  const { user } = (window as any).__CONTEXT?.auth || { user: null };
  return <Navigate to={user?.role === 'teacher' ? '/teacher' : '/student'} replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardRedirect />
      },
      {
        path: 'teacher',
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            path: '',
            element: <TeacherDashboard />
          }
        ]
      },
      {
        path: 'student',
        element: <ProtectedRoute requiredRole="student" />,
        children: [
          {
            path: '',
            element: <StudentDashboard />
          }
        ]
      },
      {
        path: 'forms/create',
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            path: '',
            element: <FormCreate />
          }
        ]
      },
      {
        path: 'forms/:id/edit',
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            path: '',
            element: <FormEdit />
          }
        ]
      },
      {
        path: 'forms/:id/results',
        element: <ProtectedRoute requiredRole="teacher" />,
        children: [
          {
            path: '',
            element: <FormResults />
          }
        ]
      },
      {
        path: 'forms/:id',
        element: <FormView />
      },
      {
        path: 'subjects/:id',
        element: <Subject />
      }
    ]
  }
]);

const AppRouter: React.FC = () => {
  window.__CONTEXT = {
    get auth() {
      return document.getElementById('root')?.__REACT_CONTEXT?.auth;
    }
  };
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;

declare global {
  interface Window {
    __CONTEXT: {
      auth: any;
    };
  }
  
  interface HTMLElement {
    __REACT_CONTEXT?: {
      auth: any;
    };
  }
}