import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import QuestionForm from "../components/forms/QuestionForm";
import { useAuth } from "../contexts/AuthContext";
import { SUBJECTS } from "../utils/constants";
import { createForm, updateForm } from "../services/formService";
import { Question } from "../types";
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from "lucide-react";

const FormCreate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(
    undefined
  );

  const handleAddQuestion = () => {
    setEditingQuestion(undefined);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm("¿Estás seguro de eliminar esta pregunta?")) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleSaveQuestion = (question: Question) => {
    if (editingQuestion) {
      setQuestions(questions.map((q) => (q.id === question.id ? question : q)));
    } else {
      setQuestions([...questions, question]);
    }
    setShowQuestionForm(false);
    setEditingQuestion(undefined);
  };

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    [newQuestions[index], newQuestions[targetIndex]] = [
      newQuestions[targetIndex],
      newQuestions[index],
    ];

    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Por favor ingresa un título para el formulario");
      return;
    }

    if (!subject) {
      alert("Por favor selecciona una materia");
      return;
    }

    if (questions.length === 0) {
      alert("Por favor agrega al menos una pregunta");
      return;
    }

    if (user) {
      const newForm = createForm(title, subject, user.id);
      const updatedForm = { ...newForm, questions };
      updateForm(updatedForm);

      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">
              Crear Nuevo Formulario
            </h1>
            <p className="text-gray-600 mt-1">
              Crea un formulario de opción múltiple para tus estudiantes.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Título del Formulario
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Fundamentos de programación"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="subject"
                >
                  Materia
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar materia</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* sesión de preguntas */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-800">Preguntas</h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus size={18} className="mr-1" />
                  Agregar Pregunta
                </button>
              </div>

              {showQuestionForm && (
                <QuestionForm
                  initialQuestion={editingQuestion}
                  onSave={handleSaveQuestion}
                  onCancel={() => {
                    setShowQuestionForm(false);
                    setEditingQuestion(undefined);
                  }}
                />
              )}

              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-blue-800">
                          Pregunta {index + 1}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleMoveQuestion(index, "up")}
                            disabled={index === 0}
                            className={`text-gray-500 ${
                              index === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:text-blue-700"
                            }`}
                          >
                            <ChevronUp size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveQuestion(index, "down")}
                            disabled={index === questions.length - 1}
                            className={`text-gray-500 ${
                              index === questions.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:text-blue-700"
                            }`}
                          >
                            <ChevronDown size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditQuestion(question)}
                            className="text-gray-500 hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-gray-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <p className="mb-2">{question.text}</p>

                      <div className="space-y-1 ml-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full mr-2 ${
                                optIndex === question.correctAnswer
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                            <span
                              className={`${
                                optIndex === question.correctAnswer
                                  ? "font-medium"
                                  : ""
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-4">
                    No hay preguntas agregadas aún.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus size={18} className="mr-1" />
                    Agregar Primera Pregunta
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Guardar Formulario
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FormCreate;
