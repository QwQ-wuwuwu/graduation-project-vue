<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const count = ref<number>(0)
let number = 0
const sum = ref<number>(0)
const process = reactive({
  processName: '',
  items: ref([])
})
const newItem = reactive({
  name: '',
  number: 0,
  score: 0,
  detail: ''
})
let optionProcess = reactive({
  processName: '',
  items: []
})
function addProcess() {
  if (!newItem.name || !newItem.score) {
    alert('打分项名称或分值比例不能为空或0')
    return
  }
  if (count.value > 0) {
    const item = { ...newItem } // 创建一个新的item
    item.number = number++
    process.items.push(item)
    optionProcess.items.push(item) // 用于页面展示
    sum.value += parseFloat(item.score) // 防止拼接成字符串
    count.value--
  } else {
    alert('继续上传请重新设置“项目数量”大于0')
    return
  }
}
function jian() {
  if (count.value === 0) {
    return
  }
  return count.value--
}
function fn() {
  if (!process.processName) {
    alert('阶段名称不能为空')
    return
  }
  if (sum.value !== 100) {
    alert('分值比例和不为100，请重新添加！')
    return
  }
  process.items = JSON.stringify(process.items) // 由于后端实体类的设计，这里数组对象必须序列化为json字符串
  axios({
    method: 'post',
    url: '/admin/process',
    data: process
  }).then((response) => {
    const code = response.data.code
    const processId = response.data.data.process.id
    console.log(processId)
    store.setProcessId(processId) // 添加全局变量过程id号
    console.log('set完成' + store.processId)
    if (code === 200) {
      alert('添加成功！\n' + '现阶段是' + process.processName)
      return
    }
    alert('添加失败')
  })
}
function shanchu(index) {
  optionProcess.items.splice(index, 1)
}
</script>
<template>
  <div>
    <h2>过程设定模块</h2>
    <label
      >阶段名称：<input type="text" placeholder="*必填" required v-model="process.processName"
    /></label>
    <br />
    <br />
    <span>项目数量：</span>
    <button @click="jian()">-</button><button>{{ count }}</button>
    <button @click="count++">+</button>
    <br />
    <br />
    <div class="process">
      <label>打分项名称：<input type="text" placeholder="*必填" v-model="newItem.name" /></label>
      <br />
      <br />
      <label>分值比例：<input type="text" placeholder="*必填" v-model="newItem.score" /></label>
      <br />
      <br />
      <label>细节描述：<input type="text" placeholder="*选填" v-model="newItem.detail" /></label>
      <br />
      <br />
      <button @click="addProcess()">添加打分项目{{ count }}</button> <br />
      <br />
      <button @click="fn()">确认添加以下项目</button> <br />
      <div v-show="process.items.length > 0">
        <ul>
          <li v-for="(p, d) in optionProcess.items" :key="d">
            {{ p }} <button @click="shanchu(d)">删除</button>
          </li>
        </ul>
      </div>
      <br />
      <span>*注意各项分值比例相加应为100</span>
    </div>
  </div>
</template>
