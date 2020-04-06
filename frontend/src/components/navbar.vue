<template>
    <div class="app-navbar" v-if="isLoggedIn">
        <b-navbar shadow fixed-top>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="temp-logo.png" alt="Logo" />
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
                    Dashboard
                </b-navbar-item>
                <b-navbar-dropdown label="Admin">
                    <b-navbar-item tag="router-link" :to="{ path: '/users' }">
                        Users
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-light" @click="logout()">Log out</a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { AUTH_LOGOUT } from '../store/modules/auth/auth-action-types';

export default {
    name: 'Navbar',
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    methods: {
        logout() {
            this.$store.dispatch(AUTH_LOGOUT);
            this.$router.push('/login');
        },
    },
};
</script>

<style lang="scss" scoped></style>
