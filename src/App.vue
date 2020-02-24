<template>
    <div id="app" class="p-app">
        <Navbar />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from './components/navbar';

export default {
    name: 'App',
    components: { Navbar },
};
</script>

<style lang="scss">
@import 'styles.scss';
</style>
