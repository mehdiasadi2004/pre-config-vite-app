// filepath: /e:/SepeherAcademy/MainApp/src/core/services/interceptor/index.interceptor.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from 'react-hot-toast';

// ** Core Imports
import { handleLogout } from "../../utils/logout.utils";
import { showErrorToast } from "../../utils/toast.utils";
import { getItem } from "../common/storage.service";
const baseURL = import.meta.env.VITE_BASE_URL;
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

let activeRequests = 0;
let toastId: string;

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (activeRequests === 0) {
      toastId = toast.loading("در حال بارگزاری...");
    }
    activeRequests++;
    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      toast.dismiss(toastId);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    activeRequests--;
    if (activeRequests === 0) {
      toast.dismiss(toastId);
    }
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      toast.dismiss(toastId);
    }
    try {
      const errorStatus = error.response.status;
      if (errorStatus === 401) handleLogout();
      const expectedError: boolean =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        try {
          if (error.response.status === 401) handleLogout();
          else {
            showErrorToast("مشکلی به وجود آمد! مجددا تلاش کنید");
          }
        } catch (er) {
          if (error.response.status === 401) handleLogout();
          else {
            showErrorToast("مشکلی به وجود آمد! مجددا تلاش کنید");
          }
        }
      }
    } catch (er) {
      showErrorToast("مشکلی به وجود آمد! مجددا تلاش کنید");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig<any>
  ): Promise<InternalAxiosRequestConfig> => {
    if (config.headers) {
      const token = getItem("token");

      if (token) config.headers.Authorization = "Bearer " + token;
    }
    return config;
  }
);

const methods = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
  request: instance.request,
};

export default methods;
