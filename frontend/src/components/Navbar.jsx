import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">LoguisLP</h1>
        <div className="space-x-4">
          <Link to="/shipments" className="hover:underline">Envíos</Link>
          <Link to="/tracking" className="hover:underline">Tracking</Link>
          <Link to="/login" className="hover:underline">Salir</Link>
        </div>
      </div>
    </nav>
  );
}
