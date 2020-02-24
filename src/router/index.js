import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: (_to, _from, next) => {
            if (localStorage.getItem('p-login')) {
                next('/dashboard');
            } else {
                next();
            }
        },
        component: () =>
            import(/* webpackChunkName: 'login' */ '../views/login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        beforeEnter: (_to, _from, next) => {
            if (localStorage.getItem('p-login')) {
                next('/dashboard');
            } else {
                next();
            }
        },
        component: () =>
            import(/* webpackChunkName: 'login' */ '../views/register.vue'),
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        beforeEnter: (_to, _from, next) => {
            if (localStorage.getItem('p-login')) {
                next('/dashboard');
            } else {
                next();
            }
        },
        component: () =>
            import(/* webpackChunkName: 'login' */ '../views/forgot-password.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import(
                /* webpackChunkName: 'dashboard' */ '../views/dashboard.vue'
            ),
    },
    {
        path: '/parking/:id',
        name: 'parking-details',
        component: () =>
            import(
                /* webpackChunkName: 'parking' */ '../views/parking-details.vue'
            ),
    },
    {
        path: '*',
        redirect: '/dashboard',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, _from, next) => {
    next();
    // if (!localStorage.getItem('p-login') && to.path !== '/login') {
    //     next('/login');
    // } else {
    //     next();
    // }
});

export default router;
