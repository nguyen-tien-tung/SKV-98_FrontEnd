import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BACKEND_URL as string;

const $axios = axios.create({
  baseURL: API,
});

$axios.interceptors.request.use((config) => {
  if (!config.headers)
    throw new Error(
      "Expecting 'config' and 'config.headers' not to be be undefined!"
    );
});

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/auth/login`;
    }
  }
);

$axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("accessToken");

export default $axios;
