import { $host, $authHost } from '@/api/index';

export const registerApi = async (login: string, password: string) => {
  const { data } = await $host.post('api/v1/auth/register', { login, password });
  return { data };
}

export const loginApi = async (login: string, password: string) => {
  const { data } = await $host.post('api/v1/auth/login', { login, password });
  return { data };
}

export const refreshApi = async (refreshToken: string) => {
  const { data } = await $host.post('api/v1/auth/refresh', { refreshToken });
  return { data };
}

export const logoutApi = async () => {
  return await $authHost.post('api/v1/auth/logout');
}
