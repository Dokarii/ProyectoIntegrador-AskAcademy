import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import FormCard from '../components/dashboard/FormCard';
import { useAuth } from '../contexts/AuthContext';
import { Form } from '../types';
import { SUBJECTS } from '../utils/constants';
import { getFormsBySubject } from '../services/formService';
import { deleteForm } from '../services/storageService';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Subject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isTeacher } = useAuth();
  const [subject, setSubject] = useState<{ id: string; name: string; description: string } | null>(null);
  const [forms, setForms] = useState<Form[]>([]);
  
  useEffect(() => {
    if (id) {
      const subjectData = SUBJECTS.find(s => s.id === id);
      if (subjectData) {
        setSubject(subjectData);
        
        const subjectForms = getFormsBySubject(id);
        setForms(subjectForms);
      }
    }
  }, [id]);
  
  const handleDeleteForm = (formId: string) => {
    deleteForm(formId);
    setForms(forms.filter(form => form.id !== formId));
  };
  
  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Cargando datos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
            <p className="text-blue-100">{subject.description}</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Formularios Disponibles</h2>
            
            {isTeacher && (
              <Link
                to="/forms/create"
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus size={18} className="mr-1" />
                Crear Formulario
              </Link>
            )}
          </div>
          
          {forms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map(form => (
                <FormCard 
                  key={form.id} 
                  form={form} 
                  showActions={isTeacher}
                  onDelete={handleDeleteForm}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600 mb-4">No hay formularios disponibles para esta materia.</p>
              {isTeacher && (
                <Link
                  to="/forms/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus size={18} className="mr-1" />
                  Crear el primer formulario
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Subject;