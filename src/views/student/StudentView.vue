<script setup lang="ts"></script>
import { RouterView, RouterLink } from 'vue-router'
<template>
  <div>
    <div class="header">
      <h3>我是学生模块菜单</h3>
      <RouterLink to="/student/password">修改密码</RouterLink>
    </div>
    <div class="meun">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style scoped>
.meun {
  border: 1px solid black;
}
</style>
