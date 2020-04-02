<template>
    <div id="app" class="p-app">
        <b-loading :active.sync="isLoading"></b-loading>
        <Navbar />
        <div class="container">
            <router-view />
        </div>
        <AppVersion />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/navbar';
import AppVersion from './components/version';

export default {
    name: 'App',
    components: { Navbar, AppVersion },
    computed: {
        ...mapGetters(['isLoading']),
    },
};
</script>

<style lang="scss">
@import 'styles.scss';
</style>
