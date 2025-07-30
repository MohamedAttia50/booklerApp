import axios from "axios";
import { store } from "../store";
import { showLoader,hideLoader } from "../store/uiSlice";

export const api = axios.create({
  baseURL: 'https://booklerbackend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader()); 
    return config;
  },
  (error) => {
    store.dispatch(hideLoader()); 
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader()); 
    return response;
  },
  (error) => {
    store.dispatch(hideLoader()); 
    return Promise.reject(error);
  }
)