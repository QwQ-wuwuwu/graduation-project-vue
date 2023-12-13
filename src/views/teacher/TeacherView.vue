<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div class="header">
      <h2>我是教师模块菜单</h2>
    </div>
    <div class="sidebar">
      <RouterLink to="/teacher/selected">学生信息</RouterLink> <br />
      <br />
      <RouterLink to="/teacher/unSelected">未选名单</RouterLink> <br />
      <br />
      <RouterLink to="/teacher/processScore">审核/打分</RouterLink> <br />
      <br />
      <RouterLink to="/teacher/password">修改密码</RouterLink>
    </div>
    <div class="menu">
      <RouterView></RouterView>
    </div>
  </div>
</template>
