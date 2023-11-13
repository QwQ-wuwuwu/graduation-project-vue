<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div id="header">
      <h2>我是管理员模块菜单</h2>
    </div>
    <div id="sidebar">
      <ul>
        <li><RouterLink to="/admin/time">设置时间</RouterLink></li>
        <li><RouterLink to="/admin/password">修改密码</RouterLink></li>
        <li><RouterLink to="/admin/grouping">分组提交</RouterLink></li>
        <li><RouterLink to="/admin/process">过程设定</RouterLink></li>
        <li><RouterLink to="/admin/student">学生导入</RouterLink></li>
        <li><RouterLink to="/admin/teacher">教师导入</RouterLink></li>
      </ul>
    </div>
    <div id="meun">
      <RouterView> </RouterView>
    </div>
  </div>
</template>
<style scoped>
#sidebar {
  float: left;
  width: 20%;
  border: 1px solid black;
}

#menu {
  float: left;
  width: 80%;
  border: 3px solid black;
}
</style>
