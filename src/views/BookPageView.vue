<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.ts";
import type {BookExtended} from "@/types";
import {booklistBook, getBook, readBook} from "@/api/books.ts";
import type {AxiosError} from "axios";
import IconBookmark from "@/components/icons/IconBookmark.vue";
import IconDone from "@/components/icons/IconDone.vue";
import IconBookmarkFilled from "@/components/icons/IconBookmarkFilled.vue";
import IconDoneFilled from "@/components/icons/IconDoneFilled.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isLoading = ref(false);
const id = parseInt(route.params.id as string, 10);
const book = ref<BookExtended>({
  id: 0,
  name: '',
  originalName: '',
  cover: '',
  avgRating: 0,
  author: '',
  abstract: '',
  category: '',
  year: 0,
  pages: 0,
  language: '',
  isRead: false,
  isInBooklist: false,
});
const isError = ref(!book.value);

const getBookInfo = async () => {
  try {
    isLoading.value = true;
    book.value = (await getBook(id)) as BookExtended;
    isError.value = false;
  } catch (e) {
    isError.value = true;
    console.log((e as AxiosError).response);
  } finally {
    isLoading.value = false;
  }
}

const addToBooklist = async () => {
  try {
    // isLoading.value = true;
    const updatedBook = (await booklistBook(book.value.id)) as BookExtended;
    book.value = { ...book.value, ...updatedBook };
    // isError.value = false;
  } catch (e) {
    isError.value = true;
    console.log((e as AxiosError).response);
  } finally {
    // isLoading.value = false;
  }
}

const addToReadBook = async () => {
  try {
    // isLoading.value = true;
    const updatedBook = (await readBook(book.value.id)) as BookExtended;
    book.value = { ...book.value, ...updatedBook };
    // isError.value = false;
  } catch (e) {
    isError.value = true;
    console.log((e as AxiosError).response);
  } finally {
    // isLoading.value = false;
  }
}

function handleImageError(e: Event): void {
  const target = e.target as HTMLImageElement;
  target.src = 'https://cdn.litres.ru/pub/c/cover/66691848.jpg';
}

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    await authStore.logout(false);
    await router.push('/login');
  } else {
    await getBookInfo();
    // book.value = {
    //   id: id,
    //   name: 'Война и мир',
    //   cover: 'https://cdn.litres.ru/pub/c/cover/66691848.jpg',
    //   avgRating: 8.1,
    //   category: 'Популярное',
    //   author: 'Лев Толстой',
    //   language: 'Русский',
    //   year: 1869,
    //   originalName: 'Война и мир',
    //   pages: 1225,
    //   abstract: `Роман «Война и мир», одно из величайших произведений русской и мировой литературы, создавался Л.Н. Толстым на протяжении шести лет, восемь раз переписывался, а отдельные эпизоды – более двадцати раз. Исследователи насчитывают пятнадцать вариантов одного только начала романа. В данной книге использована вторая редакция «Войны и мира» (1873 год), наиболее полная и удобная для чтения, поскольку Толстой перевёл на русский весь французский текст романа.\n\nКнига снабжена большим количеством иллюстраций, показывающих прототипов главных героев, исторических персонажей, а также хронику нашествия Наполеона на Россию. Развернутые комментарии к ним дал российский литературовед, доктор филологических наук Борис Соколов. Из этих комментариев можно узнать много интересных и неожиданных подробностей об исторической канве «Войны и мира».`,
    //   isRead: false,
    //   isInBooklist: false,
    // }
  }
})
</script>

<template>
<div class="book-page" v-if="!isError && !isLoading">
  <div class="book-page__main">
    <div class="book-page__cover-container">
      <img
        :src="book.cover"
        :alt="book.name"
        class="book-page__cover"
        @error="handleImageError"
      />
    </div>
    <div class="book-page__info">
      <div class="info__additional-container">
        <div class="info__additional-item">
          <span>&#9734;</span>
          <p>{{ book.avgRating }}</p>
        </div>
        <div class="info__additional-item">
          <p>{{ book.category }}</p>
        </div>
      </div>
      <h1 class="info__title">{{ book.name }}</h1>
      <div class="info__main-container">
        <p>Автор: {{ book.author }}</p>
        <p>Категория: {{ book.category }}</p>
        <p>Язык: {{ book.language }}</p>
        <p>Год: {{ book.year }}</p>
        <p>Оригинальное название: {{ book.originalName }}</p>
        <p>Страниц: {{ book.pages }}</p>
      </div>
      <div class="info__buttons-container">
        <button class="info__button-booklist" v-if="!book.isInBooklist" v-on:click="addToBooklist();">
          <IconBookmark />
          <span>Добавить в избранное</span>
        </button>
        <button class="info__button-booklist active" v-else v-on:click="addToBooklist();">
          <IconBookmarkFilled />
          <span>Добавлено в избранное</span>
        </button>
        <button class="info__button-done" v-if="!book.isRead" v-on:click="addToReadBook();">
          <IconDone />
          Прочитано
        </button>
        <button class="info__button-done active" v-else v-on:click="addToReadBook();">
          <IconDoneFilled />
          Прочитано
        </button>
      </div>
    </div>
  </div>
  <div class="book-page__description">
    <h2 class="description__title">Аннотация</h2>
    <p class="description__text">{{ book.abstract }}</p>
  </div>
</div>
</template>

<style scoped lang="scss">
.book-page {
  display: flex;
  flex-direction: column;
  gap: 36px;

  &__main {
    display: flex;
    gap: 39px;
  }

  &__cover-container {
    position: relative;
    width: 245px;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
  }

  &__cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.info {
  &__additional-container {
    display: flex;
    gap: 8px;
  }

  &__additional-item {
    padding: 10px;
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    gap: 3px;
    border: 1px solid var(--color-border);
    border-radius: 51px;

    p {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__title {
    font-size: 36px;
    font-weight: 500;
  }

  &__main-container {
    display: flex;
    flex-direction: column;

    p {
      font-size: 18px;
      font-weight: 500;
    }
  }

  &__buttons-container {
    display: flex;
    gap: 20px;

    button {
      padding: 14px 28px 14px 24px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  &__button-booklist {
    background-color: var(--color-secondary);
    border: none;
    color: var(--color-text);
  }
  &__button-booklist.active {
    background-color: var(--color-background-dark);
    border: 1px solid var(--color-border);
  }

  &__button-done {
    color: var(--color-text-secondary);
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
  }
  &__button-done.active {
    color: var(--color-text-read);
    border-color: var(--color-btn-read);
  }
}

.description {
  &__title {
    font-size: 18px;
    font-weight: 700;
  }

  &__text {
    font-size: 18px;
    font-weight: 500;
    white-space: pre-wrap;
  }
}
</style>
