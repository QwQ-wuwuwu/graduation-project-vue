<script setup lang="ts">
import axios from '@/axios/index'
import { reactive, onMounted, ref } from 'vue'
import router from '@/router'
const teachers = reactive([])
const msg = ref('')
const msg1 = ref('')
const code = ref<number>()
onMounted(() => {
  axios({
    method: 'get',
    url: '/student/info'
  }).then((response) => {
    const code = response.data.code
    if (code !== 200) {
      msg1.value = response.data.message
      return
    }
    const data = response.data.data.teachers
    teachers.values = data
    msg.value = response.data.message
  })
})
async function select(item) {
  axios({
    method: 'put',
    url: `/student/teacher/${item.id}`
  }).then((response) => {
    code.value = response.data.code
    if (code.value === 200) {
      window.alert('选择导师成功')
      router.push('/student/info').then(() => {
        window.location.reload()
      })
    } else {
      window.alert('选择失败，请稍后再试')
    }
  })
}
</script>
<template>
  <div>
    <h3>{{ msg || msg1 }}!</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>学工号</th>
          <th>剩余可选人数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in teachers.values" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.tname }}</td>
          <td>{{ item.userNumber }}</td>
          <td>{{ item.leftSelect }}</td>
          <button @click="select(item)">选择导师</button>
        </tr>
      </tbody>
    </table>
    <hr />
    <RouterLink to="/student/upload">上传文件</RouterLink>
  </div>
</template>
