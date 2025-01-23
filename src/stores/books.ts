import {ref} from "vue";
import { defineStore } from "pinia";
import {useRouter} from "vue-router";

export const useBookStore = defineStore('books', () => {
  const router = useRouter();
  const searchString = ref('');
  const isEmpty = ref(true);

  const openBookPage = async (id: number) => {
    await router.push({name: 'book', params: {id}}); // not working
  }
  function limitDecimal(value: number) {
    return parseFloat(value.toFixed(1));
  }

  return {
    searchString,
    isEmpty,
    openBookPage,
    limitDecimal
  }
});
