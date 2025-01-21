<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.ts";
import "@/assets/auth-shared.scss"

const authStore = useAuthStore();
</script>

<template>
  <div class="auth-view">
    <div class="auth-title">
      <p>Регистрация</p>
    </div>
    <div class="auth-form-container">
      <form class="auth-form">
        <div class="auth-input">
          <label for="login">Логин</label>
          <input type="text" v-model="authStore.username" placeholder="Введите логин">
        </div>
        <div class="auth-input">
          <label for="password">Пароль</label>
          <input type="password" v-model="authStore.password" placeholder="Введите пароль">
          <small v-if="authStore.authError && !authStore.isLoginIncorrect">
            Произошла ошибка, попробуйте еще раз.
          </small>
          <small v-if="authStore.authError && authStore.isLoginIncorrect">
            Найден пользователь с таким логином.
          </small>
        </div>
        <button
          @click="authStore.register"
          :disabled="authStore.isLoginIncorrect || authStore.loading"
        >Создать аккаунт</button>
      </form>
      <p>Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink></p>
    </div>
  </div>
</template>
