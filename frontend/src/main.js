import Vue from 'vue';
import Buefy from 'buefy';

import App from './app.vue';
import router from './router';
import store from './store';
import appInit from './app-init';

appInit();

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
