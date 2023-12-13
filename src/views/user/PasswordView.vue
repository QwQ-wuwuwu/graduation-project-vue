<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const pw = ref('')
const password = ref('')
const updatePassword = () => {
  if (pw.value !== password.value) {
    alert('两次输入的密码不一致，请重新输入')
    pw.value = ''
    password.value = ''
    return
  }
  axios({
    method: 'put',
    url: `/user/password/${password.value}`
  }).then((response) => {
    const code = response.data.code
    if (code == 200) {
      alert('修改密码成功')
    } else {
      alert('修改密码失败')
    }
    pw.value = ''
    password.value = ''
  })
}
</script>
<template>
  <div>
    <h3>修改用户密码</h3>
  </div>
  <div>
    输入新的密码：
    <input type="password" v-model="pw" /> <br />
    <br />
    再次输入密码：
    <input type="password" v-model="password" /> <br />
    <br />
    <button @click="updatePassword()">确认修改</button>
  </div>
</template>
