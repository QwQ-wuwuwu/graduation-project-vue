import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/api'
axios.interceptors.request.use(
  (req) => {
    const auth = sessionStorage.getItem('token')
    if (auth && req.headers) {
      req.headers.token = auth
    }
    return req
  },
  (error) => {
    console.log(error)
    return Promise.reject()
  }
)
export default axios
