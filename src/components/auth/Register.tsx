import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: "",
    tipoUsuario: "ESTUDIANTE", // Valor por defecto, debe coincidir con tu enum en Spring
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.contrasena ||
      !formData.telefono
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (formData.contrasena !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email inválido");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          contrasena: formData.contrasena,
          telefono: formData.telefono,
          tipoUsuario: formData.tipoUsuario,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al registrar usuario");
      }

      const data = await response.json();

      if (register) {
        register(data.email, formData.contrasena, data.tipoUsuario);
      }

      navigate("/dashboard");
    } catch (e: any) {
      setError(e.message || "Error al registrar usuario");
      console.error("Registration error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Crear Cuenta
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre Completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contrasena"
          >
            Contraseña
          </label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            value={formData.contrasena}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Crea una contraseña segura"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repite tu contraseña"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="telefono"
          >
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Usuario
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="tipoUsuario"
                value="ESTUDIANTE"
                checked={formData.tipoUsuario === "ESTUDIANTE"}
                onChange={handleChange}
              />
              <span className="ml-2 text-gray-700">Estudiante</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="tipoUsuario"
                value="DOCENTE"
                checked={formData.tipoUsuario === "DOCENTE"}
                onChange={handleChange}
              />
              <span className="ml-2 text-gray-700">Docente</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-70"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

export default Register;
