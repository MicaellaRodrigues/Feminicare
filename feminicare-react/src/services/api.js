import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // passou a vir de env
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Tratar erro de autenticação - Token expirado ou inválido
      localStorage.removeItem("@FeminiCare:token");
      localStorage.removeItem("@FeminiCare:user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
