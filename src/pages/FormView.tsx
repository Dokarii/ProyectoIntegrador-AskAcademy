import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { getForm, getStudentResponseToForm, submitFormResponse } from '../services/formService';
import { Form, Question } from '../types';

const FormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<Form | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  useEffect(() => {
    if (id && user) {
      const formData = getForm(id);
      if (formData) {
        setForm(formData);
        
        // Initialize answers array
        setAnswers(Array(formData.questions.length).fill(-1));
        
        // Check if student already submitted the form
        const existingResponse = getStudentResponseToForm(id, user.id);
        if (existingResponse) {
          setHasSubmitted(true);
          setAnswers(existingResponse.answers);
          setScore(existingResponse.score);
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, user, navigate]);
  
  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (hasSubmitted) return;
    
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (form && currentQuestion < form.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handleSubmit = () => {
    if (!form || !user) return;
    
    // Check if all questions are answered
    if (answers.includes(-1)) {
      alert('Por favor responde todas las preguntas antes de enviar');
      
      // Navigate to the first unanswered question
      const firstUnanswered = answers.findIndex(a => a === -1);
      if (firstUnanswered !== -1) {
        setCurrentQuestion(firstUnanswered);
      }
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = submitFormResponse(form.id, user.id, answers);
      if (response) {
        setHasSubmitted(true);
        setScore(response.score);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progressPercentage = form ? (currentQuestion + 1) / form.questions.length * 100 : 0;
  
  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Cargando formulario...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800">{form.title}</h1>
            
            {!hasSubmitted ? (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">
                    Pregunta {currentQuestion + 1} de {form.questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(progressPercentage)}% completado
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <div className="flex justify-between items-center">
                  <p>Has completado este formulario.</p>
                  <span className="font-bold">
                    Puntuación: {Math.round(score || 0)}%
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Question Card */}
          {form.questions.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {hasSubmitted ? (
                // Results view
                <div className="space-y-8">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">Resultados</h2>
                  
                  {form.questions.map((question, qIndex) => (
                    <div key={question.id} className="border-b pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                            {qIndex + 1}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800 mb-3">{question.text}</h3>
                          
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => {
                              const isSelected = answers[qIndex] === oIndex;
                              const isCorrect = question.correctAnswer === oIndex;
                              
                              let optionClass = "border rounded-md p-3 flex items-center";
                              
                              if (isSelected && isCorrect) {
                                optionClass += " bg-green-100 border-green-300";
                              } else if (isSelected && !isCorrect) {
                                optionClass += " bg-red-100 border-red-300";
                              } else if (isCorrect) {
                                optionClass += " bg-green-50 border-green-200";
                              } else {
                                optionClass += " border-gray-200";
                              }
                              
                              return (
                                <div key={oIndex} className={optionClass}>
                                  <div className="mr-3">
                                    {isSelected && isCorrect && (
                                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                                    )}
                                    {isSelected && !isCorrect && (
                                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white">✗</span>
                                    )}
                                    {!isSelected && isCorrect && (
                                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white opacity-50">✓</span>
                                    )}
                                    {!isSelected && !isCorrect && (
                                      <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300"></span>
                                    )}
                                  </div>
                                  <span className={isCorrect ? 'font-medium' : ''}>{option}</span>
                                </div>
                              );
                            })}
                          </div>
                          
                          {answers[qIndex] !== question.correctAnswer && (
                            <div className="mt-3 text-sm text-red-600">
                              Respuesta correcta: {question.options[question.correctAnswer]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Form view
                <div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                        {currentQuestion + 1}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800 mb-4">
                        {form.questions[currentQuestion].text}
                      </h3>
                      
                      <div className="space-y-2">
                        {form.questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectAnswer(currentQuestion, index)}
                            className={`w-full text-left border rounded-md p-3 hover:bg-blue-50 hover:border-blue-300 transition-colors ${
                              answers[currentQuestion] === index 
                                ? 'bg-blue-100 border-blue-400' 
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                <div className={`w-5 h-5 flex items-center justify-center rounded-full ${
                                  answers[currentQuestion] === index 
                                    ? 'bg-blue-500 text-white' 
                                    : 'border border-gray-300'
                                }`}>
                                  {answers[currentQuestion] === index && (
                                    <span>✓</span>
                                  )}
                                </div>
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                      className={`px-4 py-2 rounded-md ${
                        currentQuestion === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      Anterior
                    </button>
                    
                    {currentQuestion < form.questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Siguiente
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Respuestas'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-center">
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

export default FormView;