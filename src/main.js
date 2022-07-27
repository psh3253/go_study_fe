import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import vueCookies from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

//App.use(BootstrapVue)

const app = createApp(App);
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
app.config.globalProperties.axios = axios;
app.use(router).use(vueCookies).mount('#app');