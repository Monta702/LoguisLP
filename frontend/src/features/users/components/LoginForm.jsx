import loginBg from "../../../assets/login-bg.jpg"; // ajusta la ruta
import { useState } from "react";
import { useAuth } from "../../../core/AuthContext";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Por favor completa todos los campos.");
      return;
    }

    try {
  const data = await loginUser(form);
  login({ email: form.email, token: data.access_token });

  // Mostrar alerta antes de redirigir
  await Swal.fire({
    icon: "success",
    title: "Login exitoso",
    text: "Bienvenido a LoguisLP",
    confirmButtonText: "Continuar",
    timer: 2000,  // opcional: se cierra solo después de 2s
    timerProgressBar: true
  });

  // Redirigir después de cerrar alerta
  navigate("/shipments");
} catch (err) {
  if (err.response?.status === 401) setMessage("Credenciales inválidas");
  else if (err.response?.status === 422) setMessage("Por favor revisa los datos ingresados");
  else setMessage("Error al iniciar sesión");
}

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
        {message && <p className={`mt-4 text-center ${message.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      </div>
    </div>
  );
}
