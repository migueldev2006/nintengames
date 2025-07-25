// src/axios/axiosApi.js
import axios from "axios";

export const getAxiosAPI = () => {
  if (typeof window === "undefined") {
    // Estamos en el servidor, no retornar axios con localStorage
    return axios.create({
      baseURL: "http://192.168.0.109:3000/api",
    });
  }

  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://192.168.0.109:3000/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
