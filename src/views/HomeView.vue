<script setup lang="ts">
import "@/assets/books-shared.scss"
import BookCard from '../components/BookCard.vue';
import {onMounted, type Ref, ref} from "vue";
import {useRouter} from "vue-router";
import {getBooks} from "@/api/books.ts";
import {useAuthStore} from "@/stores/auth.ts";
import type {AxiosError} from "axios";
import type { BookByCategory } from '@/types';

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const booksByCat: Ref<BookByCategory[]> = ref([]);

const getAllBooks = async () => {
  try {
    isLoading.value = true;
    booksByCat.value = (await getBooks()) as BookByCategory[];
  } catch (e) {
    console.log((e as AxiosError).response);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  // if (!authStore.isLoggedIn) {
  //   await authStore.logout(false);
  //   await router.push('/login');
  // }
  booksByCat.value.push(
    {
    id: 1,
    name: 'Популярное',
    books: [{
      id: 1,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }, {
      id: 2,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }, {
      id: 3,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }, {
      id: 4,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }]
  },
    {
    id: 2,
    name: 'Не самое популярное',
    books: [{
      id: 5,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 5
    }, {
      id: 6,
      name: 'Думай медленно решай быстро',
      cover: 'https://cdn.litres.ru/pub/c/cover_415/21636519.webp',
      avgRating: 7.2
    }, {
      id: 7,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 5
    }, {
      id: 8,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }, {
      id: 9,
      name: 'Война и мир',
      cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
      avgRating: 8.1
    }]
  });
});
</script>

<template>
  <div class="home-view">
    <div class="home-view__item" v-for="category in booksByCat" :key="category.id">
      <div class="item__title">
        <p>{{ category.name }}</p>
      </div>
      <div class="item__books-container">
        <BookCard v-for="book in category.books" :key="book.id" :book="book" />
      </div>
    </div>
  </div>
</template>
