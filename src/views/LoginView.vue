<script setup lang="ts">
import axios from '@/axios/index'
import router from '@/router'
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
let number = ref<string>('')
let password = ref<string>('')
let role = ref<string>('')
let agree = ''
const counterStore = useCounterStore() // 实例化

function login() {
  if (!agree) {
    window.alert('请同意并阅读用户协议')
    return
  }
  axios({
    method: 'post',
    url: '/login',
    data: {
      number: number.value,
      password: password.value,
      role: role.value
    }
  })
    .then((response) => {
      if (response.data.code === 200) {
        counterStore.logined()
        const token = response.headers.token
        token && sessionStorage.setItem('token', token)
        if (role.value === '1') {
          router.push('/teacher')
        }
        if (role.value === '2') {
          router.push('/admin')
        }
        if (role.value === '0') {
          router.push('/student')
        }
      } else {
        window.alert('账号或密码错误，请重试')
        return
      }
    })
    .catch((error) => {
      window.alert(error + '网络连接超时')
    })
}
</script>
<template>
  <div>
    <h2>毕设</h2>
    <form @submit.prevent="login()">
      <label
        >账号：<input type="text" placeholder="请输入账号" v-model.trim="number" required
      /></label>
      <br />
      <br />
      <label
        >密码：<input type="password" placeholder="请输入密码" v-model.trim="password" required
      /></label>
      <br />
      <br />
      <select id="select" v-model="role">
        <option value="">请选择身份</option>
        <option value="0">学生</option>
        <option value="1">教师</option>
        <option value="2">管理员</option>
      </select>
      <br />
      <br />
      <input type="checkbox" v-model="agree" />阅读并接收<a href="http://www.baidu.com"
        >《用户协议》</a
      >
      <br />
      <br />
      <button type="submit">登录</button> <br />
      <br />
    </form>
  </div>
</template>
