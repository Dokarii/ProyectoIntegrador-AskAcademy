import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import SubjectCard from '../components/dashboard/SubjectCard';
import FormCard from '../components/dashboard/FormCard';
import { useAuth } from '../contexts/AuthContext';
import { SUBJECTS } from '../utils/constants';
import { Form } from '../types';
import { getFormsByTeacher } from '../services/formService';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState<Form[]>([]);
  
  useEffect(() => {
    const availableForms = getFormsByTeacher('teacher1');
    setForms(availableForms);
  }, [user]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Dashboard de Estudiante</h1>
            <p className="text-gray-600 mt-1">Accede a tus materias y responde los formularios asignados.</p>
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Mis Materias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUBJECTS.map(subject => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Formularios Disponibles</h2>
            
            {forms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map(form => (
                  <FormCard key={form.id} form={form} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No hay formularios disponibles en este momento.</p>
              </div>
            )}
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Actividad Reciente</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium text-blue-800">Fundamentos de programación</p>
                    <p className="text-sm text-gray-500">Completado el 12 de octubre, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    90% correcto
                  </span>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium text-blue-800">Principios de composición visual</p>
                    <p className="text-sm text-gray-500">Completado el 8 de octubre, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    75% correcto
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">Técnicas de modelado básico</p>
                    <p className="text-sm text-gray-500">Completado el 3 de octubre, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    100% correcto
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;