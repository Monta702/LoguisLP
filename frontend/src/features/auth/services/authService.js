// src/features/auth/services/authService.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error registrando usuario");
  }

  return res.json();
}

export async function loginUser({ username, password }) {
  // Este endpoint depende de cómo implementes login en el backend
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error iniciando sesión");
  }

  const data = await res.json();
  // data debería incluir el token, guardalo en localStorage si querés
  localStorage.setItem("token", data.access_token);
  return data;
}
export function logout() {
  localStorage.removeItem("token");
}
