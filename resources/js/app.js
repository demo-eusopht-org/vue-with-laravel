require('./bootstrap');
import { createApp } from 'vue'

import App from './layout/App.vue'
import router from './routes.js'
// import VueAxios from 'vue-axios';
// import axios from 'axios';
const app = createApp(App)

app.use(router)
    // app.use(VueAxios, axios)

app.mount('#app')