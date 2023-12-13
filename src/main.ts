// main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 1. 创建 Pinia 实例
const pinia = createPinia()

// 2. 安装 Pinia 到应用程序上
app.use(pinia)

// 3. 路由器也安装到应用程序上
app.use(router)

// 在组件中使用 `useStore` 获取 store 实例

app.mount('#app')
