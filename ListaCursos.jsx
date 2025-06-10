import React, { useState, useEffect } from 'react';

function ListaCursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cursos') // Asegúrate de que el puerto coincida con tu backend
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <ul>
        {cursos.map(curso => (
          <li key={curso.id}>{curso.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCursos;