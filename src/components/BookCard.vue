<template>
  <div class="book-card">
    <div class="book-card__cover-container">
      <img
        :src="book.coverUrl"
        :alt="book.title"
        class="book-card__cover"
        @error="handleImageError"
      >
      <div class="book-card__rating">
        <span class="book-card__rating-value">{{ book.rating }}</span>
        <span class="book-card__rating-star">★</span>
      </div>
    </div>
    <h3 class="book-card__title">{{ book.title }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Book {
  id: number;
  title: string;
  coverUrl: string;
  rating: number;
}

export default defineComponent({
  name: 'BookCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
      validator: (book: Book): boolean => {
        return Boolean(
          book.title &&
          typeof book.coverUrl === 'string' &&
          typeof book.rating === 'number' &&
          book.rating >= 0 &&
          book.rating <= 10
        );
      }
    }
  },
  methods: {
    handleImageError(e: Event): void {
      const target = e.target as HTMLImageElement;
      target.src = '/images/default-cover.jpg';
    }
  }
})
</script>

<style lang="scss" scoped>
.book-card {
  width: 200px;
  margin: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
}

.book-card__cover-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.book-card__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-card__rating {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.book-card__rating-value {
  font-weight: bold;
  color: #333;
}

.book-card__rating-star {
  color: #ffd700;
}

.book-card__title {
  padding: 12px;
  margin: 0;
  font-size: 16px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
