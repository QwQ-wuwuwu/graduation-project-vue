<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const isLogin = sessionStorage.getItem('logined')
if (isLogin) {
  counterStore.login = true
}
</script>

<template>
  <div>
    <LoginView v-show="!counterStore.login" />
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
