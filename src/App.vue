<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <HeaderComponent />
  <div class="bg-container">
    <div class="content">
      <RouterView />
    </div>
  </div>

  <FooterComponent />
</template>

<style lang="scss" scoped>
.bg-container {
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
}
.content {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center; /* для центрирования по горизонтали */
  height: 100%;
}
</style>
