import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import router from './router';
import store from './store';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './assets/style/main.less';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Quasar, { plugins: {} });

app.mount('#app');
