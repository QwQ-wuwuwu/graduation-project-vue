<script setup lang="ts">
import axios from '@/axios/index'
import * as XLSX from 'xlsx'
import { ref, reactive, onMounted } from 'vue'
const jieduan = ref<string>() // 对应阶段名称
const students = reactive([])
const code = ref<number>()
const pid = ref('')
const processes = reactive([])
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
    console.log(students.values)
  }),
    axios({
      method: 'get',
      url: '/teacher/process'
    }).then((response) => {
      if (response.data.code === 200) {
        processes.values = response.data.data.processes
      }
    })
})
async function download(number) {
  axios
    .get(`/teacher/download/${number}`, {
      params: { pid: pid.value },
      responseType: 'blob' // 响应类型为二进制数据
    })
    .then((response) => {
      const contentType = response.headers['content-type']
      if (contentType === 'application/json') {
        if (response.data.code !== 200) {
          alert('该阶段学生未上传文件！')
          return
        }
      }
      const blob = new Blob([response.data], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      // 创建一个虚拟链接并点击它来触发下载
      const a = document.createElement('a')
      a.href = url
      a.download = '阶段报告.doc' // 下载文件名
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
async function exportStudentsToExcel() {
  const data = students.values.map((student) => ({
    学工号: student.userNumber,
    所在的审核小组: student.groupId,
    毕设题目: student.projectTitle,
    姓名: student.sname
  }))
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Students')
  // 生成 Excel 文件并下载
  XLSX.writeFile(wb, '学生信息.xlsx')
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
          <select v-model="pid">
            <option value="">请选择阶段</option>
            <option v-for="item in processes.values" :key="item.id" :value="item.id">
              {{ item.processName }}
            </option>
          </select>
          <button @click="download(item.userNumber)">下载{{ jieduan }}文件报告</button>
        </tr>
      </tbody>
    </table>
    <hr />
    <button @click="exportStudentsToExcel()" v-show="students.length <= 0">
      导出信息excel表格
    </button>
  </div>
</template>
