<template>
    <div class="dashboard">
        <h3 class="title is-3 has-text-centered">Dashboard</h3>
        <ParkingList />
    </div>
</template>

<script>
import ParkingList from './parking-list';

export default {
    name: 'Dashboard',
    components: { ParkingList },
    created() {},
};
</script>

<style lang="scss" scoped></style>
