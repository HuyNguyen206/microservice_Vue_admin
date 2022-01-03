import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


window.axios = require('axios');
window.axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
window.axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.defaults.withCredentials = true;

const app = createApp(App).use(store).use(router).mount('#app')

