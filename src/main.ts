import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = 'https://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  const icode = 'B10055CAA56BE641'

  // get 请求，添加到 url 中
  config.params = { ...config.params, icode }

  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode }
  }

  store.commit('setLoading', true)

  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  console.log('e.response', e.response)
  const { error } = e.response.data
  store.commit('setError', {
    status: true,
    message: error
  })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
