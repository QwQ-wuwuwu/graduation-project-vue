<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
const students = reactive([])
onMounted(() => {
  axios({
    method: 'get',
    url: '/teacher/students2'
  }).then((response) => {
    const code = response.data.code
    if (code == 200) {
      students.values = response.data.data.students
    } else {
      alert('所有学生都已选择导师')
    }
  })
})
</script>
<template>
  <div>
    <h3 v-show="students.values.length > 0">未选导师学生表</h3>
    <table v-show="students.values.length > 0">
      <thead>
        <tr>
          <th>序号</th>
          <th>学工号</th>
          <th>姓名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in students.values" :key="item.userNumber">
          <td>{{ index + 1 }}</td>
          <td>{{ item.userNumber }}</td>
          <td>{{ item.sname }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
