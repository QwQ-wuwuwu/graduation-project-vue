<template>
  <div>
    请选择阶段项目：
    <select id="select" v-model="processId">
      <option v-for="(item, index) in processes" :key="item.id" :value="item.id">
        {{ item.processName }}
      </option>
    </select>
    <br />
    <br />
    <input type="file" @change="onFileChange" /> <br />
    <br />
    <button @click="uploadFile">确认上传</button> <br />
  </div>
</template>

<script lang="ts">
import axios from '@/axios/index'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
export default {
  setup() {
    const store = useCounterStore()
    const processes = ref([])
    const msg = ref<string>('')
    const processId = ref(null)
    onMounted(() => {
      if (store.processes.length > 0) {
        processes.value = store.processes
        return
      }
      axios({
        method: 'get',
        url: '/student/process'
      }).then((response) => {
        const data = response.data.data.processes
        processes.value = data
        store.processes = data
      })
    })
    return {
      processes,
      msg,
      processId
    }
  },

  data() {
    return {
      file: null
    }
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    uploadFile() {
      if (!this.file) {
        alert('请选择文件')
        return
      }
      if (this.processId == null) {
        alert('未选择阶段项目')
        return
      }
      const formData = new FormData()
      formData.append('file', this.file)
      axios
        .post(`/student/upload/${this.processId}`, formData) // Use this.processId
        .then((response) => {
          if (response.data.code === 200) {
            alert('文件上传成功！')
          } else {
            this.msg = response.data.message
            alert(this.msg)
          }
        })
        .catch((error) => {
          console.error(error)
          alert('文件上传失败！')
        })
    }
  }
}
</script>
