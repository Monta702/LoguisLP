import React, { useState, useEffect } from "react";
import ShipmentForm from "./components/ShipmentForm";
import ShipmentList from "./components/ShipmentList";
import { getShipments, createShipment, deleteShipment } from "./services/ShipmentService";

export default function ShipmentPage() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadShipments = async () => {
    setLoading(true);
    try {
      const data = await getShipments();
      setShipments(data);
    } catch (err) {
      console.error("Error cargando envíos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const savedShipment = await createShipment(formData);
      setShipments([savedShipment, ...shipments]);
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear envío:", err);
      alert("No se pudo crear el envío.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este envío?")) return;
    try {
      await deleteShipment(id);
      setShipments(shipments.filter(s => s.id !== id));
    } catch (err) {
      console.error("Error al eliminar envío:", err);
      alert("No se pudo eliminar el envío.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Gestión de Envíos</h2>
      <div className="text-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? "Cancelar" : "Nuevo Envío"}
        </button>
      </div>

      {showForm && <ShipmentForm onCreate={handleCreate} />}

      {loading ? (
        <p className="text-center">Cargando envíos...</p>
      ) : (
        <ShipmentList shipments={shipments} onDelete={handleDelete} />
      )}
    </div>
  );
}
