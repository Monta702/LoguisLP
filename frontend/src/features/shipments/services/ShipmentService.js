import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getShipments = async () => {
  const res = await axios.get(`${BASE_URL}/shipments/`);
  return res.data;
};

export const createShipment = async (shipmentData) => {
  const res = await axios.post(`${BASE_URL}/shipments/`, shipmentData);
  return res.data;
};

export const updateShipment = async (id, shipmentData) => {
  const res = await axios.put(`${BASE_URL}/shipments/${id}`, shipmentData);
  return res.data;
};

export const deleteShipment = async (id) => {
  const res = await axios.delete(`${BASE_URL}/shipments/${id}`);
  return res.data;
};

export const getShipmentById = async (id) => {
  const res = await axios.get(`${BASE_URL}/shipments/${id}`);
  return res.data;
};
