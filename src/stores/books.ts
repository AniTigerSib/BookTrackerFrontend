import {ref, watch} from "vue";
import { defineStore } from "pinia";
import {useRouter} from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore('books', () => {
  const selectedBookId = ref(0);
  const searchString = ref('');
  const isEmpty = ref(true);

  const openBookPage = (id: number) => {
    selectedBookId.value = id;
    router.push({name: 'book', params: {id}});
  }
});
