<template>
  <div>
    <input type="file" @change="onFileChange" /> <br />
    <br />
    <button @click="uploadFile">上传文件</button> <br />
    <br />
    <button @click="fn()">点击获取store的processId</button>
  </div>
</template>

<script lang="ts">
import axios from '@/axios/index'
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const processId = store.processId
const msg = ref<string>('')
export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    fn() {
      console.log(store.login)
    },
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    uploadFile() {
      if (!this.file) {
        alert('请选择文件')
        return
      }
      const formData = new FormData()
      formData.append('file', this.file)
      axios
        .post(`/student/upload/${processId}`, formData)
        .then((response) => {
          if (response.data.code === 200) {
            alert('文件上传成功！')
          } else {
            msg.value = response.data.message
            alert(msg.value)
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
