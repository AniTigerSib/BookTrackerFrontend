import { ref } from "vue";
import { defineStore } from "pinia";
import {loginApi, logoutApi, registerApi} from "@/api/user.ts";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access')?.toString());
  const refreshToken = ref(localStorage.getItem('refresh')?.toString());
  const username = ref('');
  const password = ref('');
  const authError = ref('');
  const loading = ref(!!accessToken.value);
  const isLoggedIn = ref(!!accessToken.value);

  const register = async () => {
    try {
      loading.value = true;
      await registerApi(username.value, password.value);
    } catch (e: any) {
      authError.value = e.response.data || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  }

  const login = async () => {
    try {
      loading.value = true;
      const { data } = await loginApi(username.value, password.value);
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;
      localStorage.setItem('access', data.accessToken);
      localStorage.setItem('refresh', data.refreshToken);
      isLoggedIn.value = true;
    } catch (e: any) {
      authError.value = e.response.data || 'Something went wrong';
    } finally {
      loading.value = false;
    }
  }

  const logout = async (sendRequest: boolean) => {
    loading.value = false;
    accessToken.value = undefined;
    refreshToken.value = undefined;
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    isLoggedIn.value = false;
    if (sendRequest) {
      try {
        loading.value = true;
        await logoutApi();
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    }
  }

  return {
    accessToken,
    refreshToken,
    username,
    password,
    authError,
    loading,
    isLoggedIn,
    register,
    login,
    logout,
  }
})
