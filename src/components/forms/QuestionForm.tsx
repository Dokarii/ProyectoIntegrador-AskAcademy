import React, { useState, useEffect } from 'react';
import { Question } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface QuestionFormProps {
  initialQuestion?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ initialQuestion, onSave, onCancel }) => {
  const [text, setText] = useState(initialQuestion?.text || '');
  const [options, setOptions] = useState<string[]>(initialQuestion?.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(initialQuestion?.correctAnswer || 0);
  
  useEffect(() => {
    if (initialQuestion) {
      setText(initialQuestion.text);
      setOptions(initialQuestion.options);
      setCorrectAnswer(initialQuestion.correctAnswer);
    }
  }, [initialQuestion]);
  
  const handleAddOption = () => {
    setOptions([...options, '']);
  };
  
  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    
    // Reset correctAnswer if the removed option was the correct one
    if (correctAnswer === index) {
      setCorrectAnswer(0);
    } else if (correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1);
    }
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Por favor ingresa el texto de la pregunta');
      return;
    }
    
    if (options.some(option => !option.trim())) {
      alert('Por favor completa todas las opciones');
      return;
    }
    
    const question: Question = {
      id: initialQuestion?.id || `question_${Date.now()}`,
      text,
      options,
      correctAnswer
    };
    
    onSave(question);
    
    // Reset form
    setText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        {initialQuestion ? 'Editar Pregunta' : 'Nueva Pregunta'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question-text">
            Pregunta
          </label>
          <input
            id="question-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe la pregunta"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Opciones
          </label>
          
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="mr-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="correctAnswer"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
              </div>
              
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Opción ${index + 1}`}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          
          {options.length < 6 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={18} className="mr-1" />
              Agregar opción
            </button>
          )}
          
          <p className="mt-2 text-sm text-gray-500">
            Selecciona la opción correcta usando el botón de radio.
          </p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;