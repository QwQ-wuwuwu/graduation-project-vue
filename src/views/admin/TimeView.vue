<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
const startTime = ref('')
const endTime = ref('')

async function fn() {
  const start = new Date(startTime.value)
  const end = new Date(endTime.value)
  const startFormate = DateFormate(start)
  const endFormate = DateFormate(end)
  axios({
    method: 'put',
    url: '/admin/time',
    params: {
      start: startFormate,
      end: endFormate
    }
  })
    .then((response) => {
      const code = response.data.code
      if (code === 200) {
        window.alert('已设置开始时间为：' + startFormate + '\n' + '结束时间为：' + endFormate)
      } else {
        window.alert('设置失败')
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
function padZero(num: number) {
  return num < 10 ? '0' + num : num
}
function DateFormate(date: Date) {
  return (
    date.getFullYear() +
    '-' +
    padZero(date.getMonth() + 1) +
    '-' +
    padZero(date.getDate()) +
    ' ' +
    padZero(date.getHours()) +
    ':' +
    padZero(date.getMinutes())
  )
}
</script>

<template>
  <div>
    <div class="header">
      <h2>设置系统开放时间</h2>
    </div>
    <div class="meun">
      开始时间：<label><input type="datetime-local" v-model="startTime" required /></label> <br />
      <br />
      结束时间：<label> <input type="datetime-local" v-model="endTime" required /></label> <br />
      <br />
      <button @click="fn()">确定</button>
    </div>
  </div>
</template>
