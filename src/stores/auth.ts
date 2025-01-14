import { ref } from "vue";
import { defineStore } from "pinia";
import {logoutApi} from "@/api/user.ts";

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access')?.toString());
  const refreshToken = ref(localStorage.getItem('refresh')?.toString());
  // const loading = ref(!!accessToken.value);

  const logout = async (sendRequest: boolean) => {
    accessToken.value = undefined;
    refreshToken.value = undefined;
    // loading.value = false;
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    if (sendRequest) {
      await logoutApi();
    }
  }

  return {
    accessToken,
    refreshToken,
    logout,
  }
})
