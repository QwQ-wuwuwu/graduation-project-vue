<script setup lang="ts">
import axios from '@/axios/index'
import { ref, reactive, onMounted } from 'vue'
const jieduan = ref<string>() // 对应阶段名称
const students = reactive([])
const code = ref<number>()
onMounted(() => {
  axios({
    method: 'get',
    url: '/teacher/students1'
  }).then((response) => {
    code.value = response.data.code
    if (code.value !== 200) {
      alert('页面数据获取失败')
    }
    students.values = response.data.data.students
  })
})
async function download(number) {
  const pid = '532129' // 替换为实际的pid

  axios
    .get(`/teacher/download/${number}`, {
      params: { pid },
      responseType: 'blob' // 响应类型为二进制数据
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)

      // 创建一个虚拟链接并点击它来触发下载
      const a = document.createElement('a')
      a.href = url
      a.download = 'projectFile.doc' // 下载文件名
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    })
    .catch((error) => {
      console.error(error)
      alert('下载失败')
    })
}
</script>
<template>
  <div>
    <h3>学生名单</h3>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>学工号</td>
          <td>所在的审核小组</td>
          <td>毕设题目</td>
          <td>姓名</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in students.values" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.userNumber }}</td>
          <td>{{ item.groupId }}</td>
          <td>{{ item.projectTitle }}</td>
          <td>{{ item.sname }}</td>
          <select>
            <option value="0">阶段一</option>
            <option value="1">阶段二</option>
          </select>
          <button @click="download(item.userNumber)">下载{{ jieduan }}文件报告</button>
        </tr>
      </tbody>
    </table>
    <hr />
    <button>导出信息excel表格</button>
  </div>
</template>
