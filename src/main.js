import { createApp, getCurrentInstance } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import '@/assets/font/font.css';
import 'ant-design-vue/dist/antd.less'
import router from './router'
import store from './store'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jsPDF from "jspdf";
import { message } from 'ant-design-vue'

const app = createApp(App)



message.config({
    duration: 2,
    maxCount: 3,
    rtl: true,
});


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
axios.defaults.baseURL="http://127.0.0.1:8000/"
axios.interceptors.request.use(function (config) {
    const auth = {
        'token': sessionStorage.getItem('token'),
        'user': sessionStorage.getItem('user'),
        'username': sessionStorage.getItem('username')
    }
    config.headers.authorization = JSON.stringify(auth) || ''
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
app.use(message)
app.use(VueAxios,axios)
app.mount('#app')

