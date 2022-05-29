import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL as string;

const $axios = axios.create({
  baseURL: API,
});

$axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }
  // config.headers.Authorization = `Bearer ${localStorage.getItem(
  //   "accessToken"
  // )}`;
  return config;
});
$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data == "Signature has expired"
    ) {
      localStorage.clear();

      window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/auth/login`;
    }
    return Promise.reject(error);
  }
);
if (localStorage.getItem("accessToken")) {
  $axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("accessToken")!
  )}`;
}

export default $axios;
