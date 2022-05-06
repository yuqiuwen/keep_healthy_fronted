import { createApp, getCurrentInstance } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import '@/assets/font/font.css';
import 'ant-design-vue/dist/antd.less'
import router from './router'
import store from './store'
import qs from 'qs'
import VueParticles from 'vue-particles'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { message } from 'ant-design-vue'

const app = createApp(App)


app.config.globalProperties.$message = message;
app.config.globalProperties.$http = axios;
app.config.globalProperties.$store = store;

// 全局过滤器
app.config.globalProperties.$filters = {
    prefix(url) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            url = `https://47.98.97.198:8082${url}`
            return url
        }
    }
}
app.config.globalProperties.$http = axios

// axios.defaults.baseURL=apiConfig.baseURL
axios.defaults.baseURL="http://47.98.97.198:8000/"
axios.interceptors.request.use(function (config) {
    // if(config.method === 'post'){//post请求需转换参数，否则接收不到
    //     config.data = qs.stringify(config.data);
    // }
    const auth = {
        'token': sessionStorage.getItem('token'),
        'user': sessionStorage.getItem('user'),
        'username': sessionStorage.getItem('username')
    }
    config.headers.authorization = JSON.stringify(auth) || ''
    console.log('headers---',config.headers)
    console.log('data---',config.data)
    console.log('session---',sessionStorage.getItem("token"))
    return config;
}, error => {
    return Promise.reject(error)
})
// axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 60000

app.use(Antd)
app.use(store)
app.use(router)
app.use(qs)
app.use(VueAxios,axios)
app.use(VueParticles)
app.mount('#app')

