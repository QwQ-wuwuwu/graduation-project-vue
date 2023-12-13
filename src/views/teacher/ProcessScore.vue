<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
const students = reactive([])
const processes = reactive([])
const items = reactive([])
const pid = ref('')
const pName = ref('')
const flag = ref(false)
const teacherName = ref('')
onMounted(() => {
  axios({
    method: 'get',
    url: '/teacher/process'
  }).then((response) => {
    processes.values = response.data.data.processes
  })
  axios({
    method: 'get',
    url: '/teacher/name'
  }).then((response) => {
    teacherName.value = response.data.data.teacherName
  })
})
const fn = async (id: string, name: string) => {
  console.log(id)
  flag.value = true
  pid.value = id
  pName.value = name
  await axios({
    method: 'get',
    url: '/teacher/group'
  }).then((response) => {
    students.values = response.data.data.students
    console.log(students.values)
  })
  await axios({
    method: 'get',
    url: `/teacher/process/${pid.value}`
  }).then((response) => {
    items.values = JSON.parse(response.data.data.process.items)
    console.log(items.values)
  })
}
let scores: number[] = [] //写成响应式页面呈现效果不是很好
let detail = {
  teacherName: '',
  score: 0,
  xijie: []
}
const confirmScore = (number: string) => {
  console.log(number)
  console.log(scores)
  let sum = 0
  scores.forEach((point, index) => {
    detail.xijie[index] = {
      number: index,
      point: point
    }
    sum += point * (items.values[index].score / 100)
  })
  detail.score = parseFloat(sum.toFixed(3))
  detail.teacherName = teacherName.value
  console.log(items.values)
  console.log(detail)
  // const studentIndex = students.values.findIndex((s) => s.userNumber === number)
  // students.values.splice(studentIndex, 1)
  scores = []
}
</script>
<template>
  <div>
    <h3>学生打分</h3>
    <div>
      <button
        v-for="(button, index) in processes.values"
        :key="button.id"
        @click="fn(button.id, button.processName)"
      >
        {{ index + 1 }} - {{ button.processName }}打分
      </button>
    </div>
    <div>
      <table v-show="flag == true">
        <caption>
          {{
            pName
          }}
        </caption>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>学号</th>
            <th v-for="item in items.values" :key="item.number">
              {{ item.name }}：{{ item.score }}%
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in students.values" :key="s.userNumber">
            <td>{{ i + 1 }}</td>
            <td>{{ s.sname }}</td>
            <td>{{ s.userNumber }}</td>
            <td v-for="(item, index) in items.values" :key="item.number">
              <input type="text" placeholder="请输入最终分数" v-model="scores[index]" />
            </td>
            <button @click="confirmScore(s.userNumber)">确认</button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
button {
  transition: all 0.2s;
}

button:hover,
button:active {
  background-color: rgb(0, 195, 255);
  transform: scale(1.1);
}
</style>
