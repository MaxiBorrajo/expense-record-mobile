import axios from "axios";
import { useAuth } from "../context/AuthContext";

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response && error?.response?.status === 401) {
      const { setAuth } = useAuth();
      setAuth(() => false);
    }
  }
);

export default axios;
