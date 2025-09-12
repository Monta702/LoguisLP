import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Acá limpiás tu token o contexto de autenticación
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-700">
            LoguisLP
          </Link>

          {/* Links */}
          <div className="flex gap-4">
            <Link
              to="/shipments"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Envíos
            </Link>
            <Link
              to="/tracking"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Tracking
            </Link>
          </div>

          {/* Botón salir */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
          >
            Salir
          </button>
        </nav>
      </header>

      {/* Contenido dinámico */}
      <main className="p-4 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
