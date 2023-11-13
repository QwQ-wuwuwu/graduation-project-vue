import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    login: false
  }),
  actions: {
    logined() {
      this.login = true
      sessionStorage.setItem('logined', 'true')
    },
    unLogin() {
      this.login = false
    }
  }
})
