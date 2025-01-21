<script setup lang="ts">
import "@/assets/books-shared.scss"
import {onMounted, ref, type Ref} from "vue";
import type {Book, BookByCategory} from "@/types";
import {getBooklist, getRead} from "@/api/books.ts";
import type {AxiosError} from "axios";
import BookCard from "@/components/BookCard.vue";
import {useAuthStore} from "@/stores/auth.ts";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);
const booksByCat: Ref<BookByCategory[]> = ref([
  {
    id: 0,
    name: 'Буклист',
    books: []
  },
  {
    id: 1,
    name: 'Прочитано',
    books: []
  }
]);

const getBooklistBooks = async () => {
  try {
    isLoading.value = true;
    booksByCat.value[0].books = (await getBooklist()) as Book[];
  } catch (e) {
    console.log((e as AxiosError).response);
  } finally {
    isLoading.value = false;
  }
}

const getReadBooks = async () => {
  try {
    isLoading.value = true;
    booksByCat.value[1].books = (await getRead()) as Book[];
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
  // } else {
  //   await getBooklistBooks();
  //   await getReadBooks();
  // }
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
