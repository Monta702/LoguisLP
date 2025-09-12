import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// Listar todos los trackings
export const getTrackings = async () => {
  const res = await axios.get(`${BASE_URL}/tracking/`);
  return res.data;
};

// Crear tracking
export const createTracking = async (trackingData) => {
  const res = await axios.post(`${BASE_URL}/tracking/`, trackingData);
  return res.data;
};

// Actualizar tracking
export const updateTracking = async (id, trackingData) => {
  const res = await axios.put(`${BASE_URL}/tracking/${id}`, trackingData);
  return res.data;
};

// Eliminar tracking
export const deleteTracking = async (id) => {
  const res = await axios.delete(`${BASE_URL}/tracking/${id}`);
  return res.data;
};
