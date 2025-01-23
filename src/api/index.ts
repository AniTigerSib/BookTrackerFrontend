import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {refreshApi} from "@/api/user.ts";
import { useAuthStore } from "@/stores/auth.ts";
import router from "@/router";

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.authorization = `Bearer ${localStorage.getItem('access')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async function (error) {
  const authStore = useAuthStore();
  const originalRequest = error.config;
  const refreshToken = localStorage.getItem('refresh');

  if (error.response?.status === 401 && !originalRequest._retry && refreshToken !== null) {
    originalRequest._retry = true;

    try {
      const newTokenPair = await refreshApi(refreshToken);
      console.log(`New token: ${newTokenPair.data.accessToken}`);
      authStore.accessToken = newTokenPair.data.accessToken;
      localStorage.setItem('access', newTokenPair.data.accessToken);
    } catch (e) {
      console.log(e);
      await authStore.logout(false);
      // await router.push('/login');
    }
  } else if (error.response?.status === 404) {
    await router.push({name: 'NotFound'});
  }

  console.log(error.response.data);
  return Promise.reject(error);
})

export {
  $host,
  $authHost,
}
