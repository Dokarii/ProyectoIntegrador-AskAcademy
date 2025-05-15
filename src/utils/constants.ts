export const SUBJECTS = [
  {
    id: '1',
    name: 'Desarrollo de software',
    description: 'Aprende a desarrollar software moderno con las mejores prácticas'
  },
  {
    id: '2',
    name: 'Diseño gráfico',
    description: 'Domina los principios del diseño gráfico y la creación visual'
  },
  {
    id: '3',
    name: 'Animación 3D',
    description: 'Explora las técnicas fundamentales de modelado y animación 3D'
  }
];

export const SAMPLE_FORMS = [
  {
    id: '1',
    title: 'Fundamentos de programación',
    subject: '1',
    createdBy: 'teacher1',
    questions: [
      {
        id: '1',
        text: '¿Qué es una variable?',
        options: [
          'Un contenedor para almacenar datos',
          'Una función matemática',
          'Un tipo de bucle',
          'Un operador lógico'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: '¿Qué estructura de control se utiliza para repetir un bloque de código?',
        options: [
          'if-else',
          'switch',
          'for',
          'try-catch'
        ],
        correctAnswer: 2
      },
      {
        id: '3',
        text: '¿Qué significa POO?',
        options: [
          'Programación Orientada a Objetos',
          'Programa Optimizado Online',
          'Proceso Operativo Organizado',
          'Programación Orientada a Operaciones'
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '2',
    title: 'Principios de composición visual',
    subject: '2',
    createdBy: 'teacher1',
    questions: [
      {
        id: '1',
        text: '¿Qué es la regla de los tercios?',
        options: [
          'Dividir un diseño en tres partes iguales',
          'Una técnica de dibujo con tres colores',
          'Dividir el encuadre en nueve partes iguales mediante dos líneas horizontales y dos verticales',
          'Una regla que establece usar máximo tres elementos en una composición'
        ],
        correctAnswer: 2
      },
      {
        id: '2',
        text: '¿Qué es el contraste en diseño?',
        options: [
          'La diferencia entre elementos en una composición',
          'Un tipo de luz específica',
          'El uso exclusivo de blanco y negro',
          'Una herramienta de Photoshop'
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '3',
    title: 'Técnicas de modelado básico',
    subject: '3',
    createdBy: 'teacher1',
    questions: [
      {
        id: '1',
        text: '¿Qué es el modelado poligonal?',
        options: [
          'Una técnica de dibujo a mano',
          'Un tipo de renderizado',
          'La creación de objetos mediante vértices, aristas y caras',
          'Un formato de archivo 3D'
        ],
        correctAnswer: 2
      },
      {
        id: '2',
        text: '¿Qué es un vértice en modelado 3D?',
        options: [
          'Un punto en el espacio 3D',
          'Una línea que conecta dos puntos',
          'Una superficie plana',
          'Un tipo de luz'
        ],
        correctAnswer: 0
      }
    ]
  }
];

export const SAMPLE_USERS = [
  {
    id: 'teacher1',
    username: 'profesor',
    password: 'profesor123',
    role: 'teacher',
    subjects: ['1', '2', '3']
  },
  {
    id: 'student1',
    username: 'estudiante',
    password: 'estudiante123',
    role: 'student',
    subjects: ['1', '2', '3']
  }
];

export const TOKEN_KEY = 'auth_token';
export const USERS_KEY = 'users';
export const FORMS_KEY = 'forms';
export const RESPONSES_KEY = 'form_responses';