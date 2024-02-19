import router from './router';
import axios from "axios";
const api = axios.create()

api.interceptors.request.use(config => {
  if (localStorage.getItem('access_token')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
  }
  return config
},
  error => {

  })

api.interceptors.response.use( {},
  error => {
    if (error.response.data.massage === "Token has expired") {
      return axios.post('/api/auth/refresh', {}, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
        .then(res => {
          localStorage.getItem('access_token', res.data.access_token)
          error.config.headers.authorization = `Bearer ${res.data.access_token}`
          return api.request(error.config)
        })

    }
    if (error.response.status === 401) {
      router.push({name: 'users.login'})
    }
  })
export default api
