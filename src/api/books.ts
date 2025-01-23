import { $authHost } from '@/api/index';

export const getBooks = async () => {
  const response = await $authHost.get('api/v1/client/books');
  return response.data;
}

export const getBook = async (id: number) => {
  const response = await $authHost.get(`api/v1/client/books/by-id/${id}`);
  return response.data;
}

export const searchBooks = async (query: string) => {
  const { data } = await $authHost.get(`api/v1/client/books/search?q=${query}`);
  return { data };
}

export const getBooklist = async () => {
  const response = await $authHost.get('api/v1/client/booklist');
  return response.data;
}

export const getRead = async () => {
  const response = await $authHost.get('api/v1/client/books/read');
  return response.data;
}

export const rateBook = async (id: number, rate: number) => {
  const { data } = await $authHost.post(`api/v1/client/books/by-id/${id}/rate`, { rating: rate });
  return { data };
}

export const booklistBook = async (id: number) => {
  const response = await $authHost.post(`api/v1/client/booklist/${id}`);
  return response.data;
}

export const readBook = async (id: number) => {
  const response = await $authHost.post(`api/v1/client/books/read/${id}`);
  return response.data;
}
