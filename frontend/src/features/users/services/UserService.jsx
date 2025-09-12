import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // tu backend

export const registerUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users/`, userData);
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, loginData, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};
