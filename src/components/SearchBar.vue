<script lang="ts">
import { defineComponent, ref } from 'vue';
import IconSearch from './icons/IconSearch.vue';

export default defineComponent({
  name: 'SearchBar',
  components: {
    IconSearch,
  },
  setup() {
    const searchQuery = ref('');

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchQuery.value = target.value;
      // Здесь можно добавить дополнительную логику обработки поискового запроса
    };

    return {
      searchQuery,
      handleInput,
    };
  },
});
</script>

<template>
  <div class="search-container">
    <IconSearch class="search-icon" />
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="Поиск книги..."
      @input="handleInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;
  max-width: 680px;
  width: 100%;
  height: 57px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  padding: 15.5px 16px;
  display: flex;
  align-items: center;
  transition: border-color 0.1s;
  background-color: var(--color-background-dark);
}

.search-container:hover {
  border-color: var(--color-border-hover);
  //transition: border-color 0.8s;

  .search-input::placeholder {
    color: var(--color-text-focused);
  }
}

.search-container:focus-within {
  border-color: var(--color-border-hover);
  //transition: border-color 0.8s;

  .search-input::placeholder {
    color: var(--color-text-focused);
    transition: color 0.2s;
  }
}

.search-icon {
  flex-shrink: 0;
  stroke: var(--color-mute);
}

.search-input {
  margin-left: 12px;
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  background: transparent;
  color: var(--color-text);

  &::placeholder {
    color: var(--color-text-unfocused);
  }
}
</style>
