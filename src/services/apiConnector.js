import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const apiConnector = (method, url, data = {}, headers = {}) => {
  const token = localStorage.getItem("token");
  return axiosInstance({
    method,
    url,
    data,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
};
