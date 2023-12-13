<script setup lang="ts"></script>
import { RouterView, RouterLink } from 'vue-router'
<template>
  <div>
    <div class="header">
      <h3>我是学生模块菜单</h3>
      <RouterLink to="/student/upload">上传文件</RouterLink> <br />
      <br />
      <RouterLink to="/student/password" id="router">修改密码</RouterLink> <br> <br>
      <RouterLink to="/student/info">选择导师</RouterLink>
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
