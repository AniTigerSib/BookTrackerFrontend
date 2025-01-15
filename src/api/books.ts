import { $authHost } from '@/api/index';

export const getBooks = async () => {
  const { data } = await $authHost.get('api/v1/client/books');
  return { data };
}

export const getBook = async (id: number) => {
  const { data } = await $authHost.get(`api/v1/client/books/${id}`);
  return { data };
}

export const searchBooks = async (query: string) => {
  const { data } = await $authHost.get(`api/v1/client/books/search?q=${query}`);
  return { data };
}

export const getBooklist = async () => {
  const { data } = await $authHost.get('api/v1/client/booklist');
  return { data };
}

export const getReadBooks = async () => {
  const { data } = await $authHost.get('api/v1/client/books/read');
  return { data };
}

export const rateBook = async (id: number, rate: number) => {
  const { data } = await $authHost.post(`api/v1/client/books/${id}/rate`, { rating: rate });
  return { data };
}

export const booklistBook = async (id: number) => {
  const { data } = await $authHost.post('api/v1/client/booklist', { bookId: id });
  return { data };
}

export const readBook = async (id: number) => {
  const { data } = await $authHost.post('api/v1/client/books/read', { bookId: id });
  return { data };
}
