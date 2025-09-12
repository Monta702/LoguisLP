import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://127.0.0.1:8000";

export default function TrackingPage() {
  const [shipmentCode, setShipmentCode] = useState("");
  const [trackingList, setTrackingList] = useState([]);
  const [error, setError] = useState("");

  const fetchTracking = async () => {
    setError("");
    setTrackingList([]);
    try {
      const res = await axios.get(`${BASE_URL}/shipments/${shipmentCode}`);
      const shipment = res.data;

      if (!shipment.tracking || shipment.tracking.length === 0) {
        setTrackingList([]);
        setError("No hay historial de tracking para este envío.");
      } else {
        const sorted = [...shipment.tracking].sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha)
        );
        setTrackingList(sorted);
      }
    } catch (err) {
      setError("No se encontró el envío con ese código.");
    }
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "#f1c40f";
      case "en_transito":
        return "#3498db";
      case "entregado":
        return "#2ecc71";
      case "cancelado":
        return "#e74c3c";
      default:
        return "#bdc3c7";
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Seguimiento de Envíos</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Ingresa el código del envío"
          value={shipmentCode}
          onChange={(e) => setShipmentCode(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchTracking}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Buscar
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div>
        <AnimatePresence>
          {trackingList.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              style={{
                borderLeft: `5px solid ${getStatusColor(t.estado)}`,
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <strong>{t.estado.replace("_", " ").toUpperCase()}</strong>
              <p>Fecha: {new Date(t.fecha).toLocaleString()}</p>
              {t.comentarios && <p>Comentarios: {t.comentarios}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
