import Vue from 'vue';
import VueRouter from 'vue-router';

import { authGuard, loginGuard } from './guards';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: loginGuard,
        component: () => import(/* webpackChunkName: 'login' */ '../views/login.vue'),
    },
    {
        path: '/registration',
        name: 'registration',
        beforeEnter: loginGuard,
        component: () => import(/* webpackChunkName: 'login' */ '../views/registration.vue'),
    },
    {
        path: '/verify',
        name: 'verify',
        beforeEnter: loginGuard,
        component: () => import(/* webpackChunkName: 'login' */ '../views/verify.vue'),
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        beforeEnter: loginGuard,
        component: () => import(/* webpackChunkName: 'login' */ '../views/forgot-password.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        beforeEnter: authGuard,
        component: () => import(/* webpackChunkName: 'dashboard' */ '../views/dashboard.vue'),
    },
    {
        path: '/users',
        name: 'users',
        beforeEnter: authGuard,
        component: () => import(/* webpackChunkName: 'users' */ '../views/user-list.vue'),
    },
    {
        path: '/users/:id',
        name: 'user-details',
        beforeEnter: authGuard,
        component: () => import(/* webpackChunkName: 'users' */ '../views/user-details.vue'),
    },
    {
        path: '/parkings',
        name: 'parking-list',
        beforeEnter: authGuard,
        component: () => import(/* webpackChunkName: 'parkings' */ '../views/parking-list.vue'),
    },
    {
        path: '/parkings/:id',
        name: 'parking-details',
        beforeEnter: authGuard,
        component: () => import(/* webpackChunkName: 'parkings' */ '../views/parking-details.vue'),
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

export default router;
