<script setup lang="ts">
import axios from '@/axios/index'
function fn() {
  axios({
    method: 'get',
    url: '/teacher/students3'
  }).then((response) => {
    console.log(response.data)
  })
}
</script>
<template>
  <div>
    <h2>教师表格导入模块</h2>
    <button @click="fn()">点击</button>
  </div>
</template>
