import React from 'react';
import { Link } from 'react-router-dom';
import { Subject } from '../../types';

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <Link 
      to={`/subjects/${subject.id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
    >
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center p-4">
        <h3 className="text-xl font-bold text-white text-center">{subject.name}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{subject.description}</p>
        <div className="mt-4 flex justify-end">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Ver detalles
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;