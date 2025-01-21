<template>
  <div class="book-card">
    <div class="book-card__cover-container">
      <img
        :src="book.cover"
        :alt="book.name"
        class="book-card__cover"
        @error="handleImageError"
      >
      <div class="book-card__rating">
        <p class="book-card__rating-value">{{ book.avgRating }}</p>
      </div>
    </div>
    <h3 class="book-card__title">{{ book.name }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Book } from '@/types';

export default defineComponent({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    }
  },
  methods: {
    handleImageError(e: Event): void {
      const target = e.target as HTMLImageElement;
      target.src = 'https://cdn.litres.ru/pub/c/cover/66691848.jpg';
    }
  }
})
</script>

<style lang="scss" scoped>
.book-card {
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }

  &__cover-container {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
  }

  &__cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__rating {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }

  &__rating-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
  }

  &__title {
    font-size: 25px;
    font-weight: 500;
    color: var(--color-text);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
