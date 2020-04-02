import Vue from 'vue';
import Buefy from 'buefy';

import App from './app.vue';
import router from './router';
import store from './store';
import interceptorsSetup from './axios/interceptors';

interceptorsSetup();

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
