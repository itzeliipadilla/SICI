import { createApp, reactive } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import axios from '@/config/axiosConfig';
const app = createApp(App);
app.config.globalProperties.$axios = axios;
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
app.config.globalProperties.$user = reactive({
    role:null
});
app.config.globalProperties.$auxiliar = reactive({
    id: null,
    name: null,
    active: null,
    role: null,
    phone: null
});

app.use(store).use(router).mount('#app')
