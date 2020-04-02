<template>
    <div class="app-version">Version: {{ version }}</div>
</template>

<script>
import { version } from '../../package.json';

export default {
    name: 'AppVersion',
    created() {
        this.version = version;
    },
    data() {
        return {
            version: '',
        };
    },
};
</script>

<style lang="scss" scoped>
.app-version {
    font-size: 16px;
    margin: 10px;
    text-align: right;
    color: #b7b7b7;
}
</style>
