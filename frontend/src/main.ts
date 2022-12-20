import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import routes from './routes';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(VueCookies);
app.use(pinia);
app.use(routes);
app.mount('#app');
