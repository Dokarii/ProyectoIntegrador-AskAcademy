import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import SubjectCard from '../components/dashboard/SubjectCard';
import FormCard from '../components/dashboard/FormCard';
import { useAuth } from '../contexts/AuthContext';
import { SUBJECTS } from '../utils/constants';
import { getTeacherForms } from '../services/formService';
import { deleteForm } from '../services/storageService';
import { Form } from '../types';
import { Plus } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState<Form[]>([]);
  
  useEffect(() => {
    if (user) {
      const teacherForms = getTeacherForms(user.id);
      setForms(teacherForms);
    }
  }, [user]);
  
  const handleDeleteForm = (formId: string) => {
    deleteForm(formId);
    setForms(forms.filter(form => form.id !== formId));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-800">Dashboard de Profesor</h1>
              <p className="text-gray-600 mt-1">Gestiona tus formularios y revisa el rendimiento de tus estudiantes.</p>
            </div>
            
            <Link
              to="/forms/create"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={18} className="mr-1" />
              Crear Formulario
            </Link>
          </div>
          
          {/* Subjects Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Materias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUBJECTS.map(subject => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </section>
          
          {/* Recent Forms Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-800">Mis Formularios</h2>
              <Link to="/forms" className="text-blue-600 hover:text-blue-800 font-medium">
                Ver todos
              </Link>
            </div>
            
            {forms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map(form => (
                  <FormCard 
                    key={form.id} 
                    form={form} 
                    showActions 
                    onDelete={handleDeleteForm} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">Aún no has creado ningún formulario.</p>
                <Link
                  to="/forms/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus size={18} className="mr-1" />
                  Crear mi primer formulario
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;