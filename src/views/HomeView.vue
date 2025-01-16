<script setup lang="ts">
import BookCard from "@/components/BookCard.vue";

</script>

<template>
  <BookCard :book="book" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Book {
  id: number;
  title: string;
  coverUrl: string;
  rating: number;
}

export default defineComponent({
  components: {
    BookCard
  },
  data() {
    return {
      book: {
        id: 1,
        title: "Война и мир",
        coverUrl: "../../public/Frame 9.png",
        rating: 4.8
      } as Book
    }
  }
})
</script>

<style scoped lang="scss">

</style>
