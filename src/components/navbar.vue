<template>
    <div class="app-navbar" v-if="isLoggedIn">
        <b-navbar shadow fixed-top>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img src="temp-logo.png" alt="Logo" />
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">Dashboard</b-navbar-item>
                <b-navbar-dropdown label="Admin">
                    <b-navbar-item href="#">Config</b-navbar-item>
                </b-navbar-dropdown>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <!-- <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">Log in</a>
                    </div>-->
                    <div class="buttons">
                        <a class="button is-light" @click="logout()">Log out</a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    created() {
        this.$root.$on('login', val => (this.isLoggedIn = val));
        this.isLoggedIn = !!localStorage.getItem('p-login');
    },
    data() {
        return {
            isLoggedIn: false,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('p-login');
            this.isLoggedIn = false;
            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped></style>