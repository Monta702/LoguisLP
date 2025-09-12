import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginForm from "./features/users/components/LoginForm";
import RegisterForm from "./features/users/components/RegisterForm";
import ShipmentPage from "./features/shipments/ShipmentPage";
import TrackingPage from "./features/tracking/TrackingPage";
import { useAuth } from "./core/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function Router() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Rutas privadas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route
          path="shipments"
          element={
            <PrivateRoute>
              <ShipmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="tracking"
          element={
          
              <TrackingPage />
          
          }
        />
        {/* Redirigir raíz a login si no hay usuario */}
        <Route index element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}
