import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Evaluaciones interactivas para el aprendizaje moderno
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Una plataforma educativa que conecta profesores y estudiantes
                  a través de formularios interactivos de opción múltiple.
                </p>

                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="inline-block bg-white text-blue-800 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition duration-200 transform hover:scale-105"
                  >
                    Ir al Dashboard
                  </Link>
                ) : (
                  <div className="space-x-4">
                    <Link
                      to="/login"
                      className="inline-block bg-white text-blue-800 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition duration-200 transform hover:scale-105"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-10 md:mt-0 md:w-1/2">
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-xl p-8 ml-auto max-w-md transform rotate-2">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">
                      Ejemplo de Formulario
                    </h3>
                    <div className="mb-4 p-4 border border-gray-200 rounded bg-black-50">
                      <p className="font-medium">
                        ¿Qué es una variable en programación?
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="option1"
                            name="answer"
                            className="h-4 w-4 text-blue-600"
                            checked
                          />
                          <label
                            htmlFor="option1"
                            className="ml-2 text-gray-800"
                          >
                            Un contenedor para almacenar datos
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="option2"
                            name="answer"
                            className="h-4 w-4 text-blue-600"
                          />
                          <label
                            htmlFor="option2"
                            className="ml-2 text-gray-800"
                          >
                            Una función matemática
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="option3"
                            name="answer"
                            className="h-4 w-4 text-blue-600"
                          />
                          <label
                            htmlFor="option3"
                            className="ml-2 text-gray-800"
                          >
                            Un tipo de bucle
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition duration-200">
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
              Características Principales
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Para Profesores
                </h3>
                <p className="text-gray-600">
                  Crea y gestiona formularios de opción múltiple para evaluar a
                  tus estudiantes. Obtén estadísticas detalladas de su
                  rendimiento.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Para Estudiantes
                </h3>
                <p className="text-gray-600">
                  Accede a formularios según tus materias asignadas y
                  respóndelos para evaluar tu conocimiento. Revisa tus
                  resultados inmediatamente.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Simple y Efectivo
                </h3>
                <p className="text-gray-600">
                  Interfaz intuitiva y fácil de usar. No se requieren
                  conocimientos técnicos para crear o responder formularios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Regístrate ahora y comienza a crear o responder formularios en
              minutos.
            </p>

            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition duration-200"
              >
                Ir a mi Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-block bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition duration-200"
              >
                Crear Cuenta Gratis
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">AskAcademy</h2>
            <p className="text-blue-200 text-sm">
              © {new Date().getFullYear()} AskAcademy. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
