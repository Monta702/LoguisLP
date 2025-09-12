import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses/`);
  return res.data;
};

export const createAddress = async (addressData) => {
  const res = await axios.post(`${BASE_URL}/addresses/`, addressData);
  return res.data;
};
