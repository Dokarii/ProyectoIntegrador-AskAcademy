import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { hasStudentSubmittedForm } from '../../services/formService';

interface FormCardProps {
  form: Form;
  showActions?: boolean;
  onDelete?: (formId: string) => void;
}

const FormCard: React.FC<FormCardProps> = ({ form, showActions = false, onDelete }) => {
  const { user, isTeacher } = useAuth();
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('¿Estás seguro de eliminar este formulario?')) {
      onDelete && onDelete(form.id);
    }
  };
  
  const hasSubmitted = user && !isTeacher 
    ? hasStudentSubmittedForm(form.id, user.id)
    : false;
  
  return (
    <Link
      to={isTeacher ? `/forms/${form.id}/edit` : `/forms/${form.id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      <div className="p-5 border-b">
        <h3 className="text-lg font-semibold text-blue-800">{form.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">
            {form.questions.length} preguntas
          </span>
          
          {!isTeacher && (
            <span 
              className={`text-xs px-2 py-1 rounded-full ${
                hasSubmitted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {hasSubmitted ? 'Completado' : 'Pendiente'}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        {isTeacher ? (
          <div className="flex space-x-2">
            <Link
              to={`/forms/${form.id}/results`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Ver resultados
            </Link>
            
            {showActions && (
              <button
                onClick={handleDelete}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Eliminar
              </button>
            )}
          </div>
        ) : (
          <span className="text-sm font-medium text-blue-600">
            {hasSubmitted ? 'Ver respuestas' : 'Responder ahora'}
          </span>
        )}
        
        <span className="text-xs text-gray-500">
          {isTeacher ? 'Editar' : 'Ver'}
        </span>
      </div>
    </Link>
  );
};

export default FormCard;