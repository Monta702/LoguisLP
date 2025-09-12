import React, { useState } from "react";
import { createTracking } from "../services/TrackingService";

export default function TrackingForm({ shipmentId, onCreated }) {
  const [estado, setEstado] = useState("pendiente");
  const [comentarios, setComentarios] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTracking({
        shipment_id: shipmentId,
        estado,
        comentarios
      });
      onCreated(res);
      setComentarios("");
      setEstado("pendiente");
    } catch (err) {
      console.error(err);
      alert("Error al crear tracking");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="pendiente">Pendiente</option>
        <option value="en_transito">En tránsito</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>
      <input
        type="text"
        placeholder="Comentarios"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>Agregar Tracking</button>
    </form>
  );
}
