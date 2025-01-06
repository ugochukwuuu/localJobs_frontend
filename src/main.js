
import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/router'
import Toast from 'vue-toastification'
import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router);
app.use(Toast);

app.mount('#app');