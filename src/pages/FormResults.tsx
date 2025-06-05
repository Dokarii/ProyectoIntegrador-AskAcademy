import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { getForm, getFormResults } from '../services/formService';
import { getUserById } from '../services/storageService';
import { Form, FormResponse } from '../types';

const FormResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [questionStats, setQuestionStats] = useState<{ correct: number; total: number; }[]>([]);
  
  useEffect(() => {
    if (id) {
      const formData = getForm(id);
      if (formData) {
        setForm(formData);
        
        // Obtener respuestas del formulario
        const formResponses = getFormResults(id);
        setResponses(formResponses);
        
        // Calcular calificacion promedio
        if (formResponses.length > 0) {
          const totalScore = formResponses.reduce((sum, response) => sum + response.score, 0);
          setAverageScore(totalScore / formResponses.length);
        }
        
        // Calcular estadísticas por pregunta
        if (formData.questions.length > 0 && formResponses.length > 0) {
          const stats = formData.questions.map((_, qIndex) => {
            const correctCount = formResponses.reduce((count, response) => {
              return count + (response.answers[qIndex] === formData.questions[qIndex].correctAnswer ? 1 : 0);
            }, 0);
            
            return {
              correct: correctCount,
              total: formResponses.length
            };
          });
          
          setQuestionStats(stats);
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);
  
  const getStudentName = (studentId: string): string => {
    const student = getUserById(studentId);
    return student ? student.username : 'Usuario Desconocido';
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!form) {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">{form.title} - Resultados</h1>
            <p className="text-gray-600 mt-1">
              Análisis de las respuestas de los estudiantes
            </p>
          </div>
          
          {/* Sección de Resumen */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Total de Respuestas</h3>
                <p className="text-3xl font-bold">{responses.length}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Puntuación Promedio</h3>
                <p className="text-3xl font-bold">{Math.round(averageScore)}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${averageScore}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Estado</h3>
                <p className="text-3xl font-bold text-green-600">Activo</p>
              </div>
            </div>
          </section>
          
          {/* Sección de Estadísticas por Pregunta */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Estadísticas por Pregunta</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pregunta
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tasa de Acierto
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {form.questions.map((question, index) => (
                      <tr key={question.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Pregunta {index + 1}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{question.text}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {questionStats[index] ? (
                            <div className="text-sm text-gray-900">
                              {questionStats[index].correct} de {questionStats[index].total}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Sin datos</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {questionStats[index] ? (
                            <div className="flex items-center">
                              <div className="flex-1 w-32">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ 
                                      width: `${(questionStats[index].correct / questionStats[index].total) * 100}%` 
                                    }}
                                  />
                                </div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">
                                {Math.round((questionStats[index].correct / questionStats[index].total) * 100)}%
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">Sin datos</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          {/* Sección de Respuestas de Estudiantes */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Respuestas de Estudiantes</h2>
            
            {responses.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estudiante
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Envío
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Puntuación
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {responses.map((response) => (
                        <tr key={response.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {getStudentName(response.studentId)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(response.submittedAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 w-32">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      response.score >= 70 
                                        ? 'bg-green-500' 
                                        : response.score >= 40 
                                          ? 'bg-yellow-500' 
                                          : 'bg-red-500'
                                    }`}
                                    style={{ width: `${response.score}%` }}
                                  />
                                </div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-900">
                                {Math.round(response.score)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              response.score >= 70 
                                ? 'bg-green-100 text-green-800' 
                                : response.score >= 40 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {response.score >= 70 
                                ? 'Aprobado' 
                                : response.score >= 40 
                                  ? 'Regular' 
                                  : 'Reprobado'
                              }
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">Aún no hay respuestas para este formulario.</p>
              </div>
            )}
          </section>
          
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormResults;