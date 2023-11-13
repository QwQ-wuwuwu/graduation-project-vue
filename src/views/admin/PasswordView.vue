<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/axios/index'
const number = ref<string>()
function fn() {
  axios({
    method: 'put',
    url: `/admin/password/${number.value}`
  })
    .then((response) => {
      const code = response.data.code
      if (code === 200) {
        window.alert('重置成功')
      } else {
        window.alert('重置失败，请稍后再试')
      }
    })
    .catch((error) => {
      window.alert(error + ' 网络连接失败')
      console.log(error)
    })
}
</script>
<template>
  <div>
    <form @submit.prevent="fn()">
      <h3>重置密码</h3>
      <label><input type="text" placeholder="需要重置的账号" v-model.trim="number" /></label> <br />
      <br />
      <button type="submit">提交</button>
    </form>
  </div>
</template>
