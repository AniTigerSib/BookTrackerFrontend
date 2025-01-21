<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import {useAuthStore} from "@/stores/auth.ts";
import IconList from "@/components/icons/IconList.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconUser from "@/components/icons/IconUser.vue";

const authStore = useAuthStore();
</script>

<template>
<header class="header">
  <div class="header__container">
    <div class="header__logo">
      <p><RouterLink to="/">Книголюб</RouterLink></p>
    </div>
    <SearchBar v-if="authStore.isLoggedIn" />
    <div class="header__menu">
      <IconList v-if="authStore.isLoggedIn"/>
      <IconLogout v-if="authStore.isLoggedIn" v-on:click="authStore.isLoggedIn = false"/>
      <IconUser v-else v-on:click="authStore.isLoggedIn = true"/>
    </div>
  </div>
</header>

</template>

<style lang="scss" scoped>
.header {
  color: var(--color-text);
  padding: 1.2rem 0;
  width: 100%;

  &__container {
    max-width: 1180px;
    margin: 0 auto;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  &__logo {
    font-size: 2.2rem;
    font-weight: 800;

    a {
      color: var(--color-text);
      text-decoration: none;
    }
  }

  &__menu {
    display: flex;
    gap: 1rem;

    svg {
      cursor: pointer;
    }
  }
}
</style>
