// authService.ts
const API_URL = "http://localhost:8080";

export const register = async (
  username: string,
  password: string,
  role: 'teacher' | 'student'
): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: username,
        email: username,
        contrasena: password,
        telefono: "0000000000", // Puedes modificar esto si tienes teléfono en el formulario
        tipoUsuario: role.toUpperCase(), // DOCENTE o ESTUDIANTE
      }),
    });

    if (!response.ok) return null;

    const user = await response.json();

    const token = btoa(
      JSON.stringify({
        id: user.id,
        username: user.email,
        role: user.tipoUsuario.toLowerCase(), // 'teacher' o 'student'
      })
    );
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Register failed", error);
    return null;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    // Por ahora no tienes un endpoint de login en el backend,
    // así que solo verificaremos si el usuario existe
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) return null;

    const usuarios = await response.json();
    const usuario = usuarios.find((u: any) => u.email === username && u.contrasena === password);

    if (!usuario) return null;

    const token = btoa(
      JSON.stringify({
        id: usuario.id,
        username: usuario.email,
        role: usuario.tipoUsuario.toLowerCase(),
      })
    );
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const getCurrentUser = (): { id: string; username: string; role: string } | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token));
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const isTeacher = (): boolean => {
  return getCurrentUser()?.role === "teacher";
};

export const isStudent = (): boolean => {
  return getCurrentUser()?.role === "student";
};
