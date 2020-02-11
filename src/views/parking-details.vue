<template>
    <div class="parking-details">
        <b-loading :active.sync="isLoading"></b-loading>
        <section class="section">
            <h4 class="title is-4">{{ parking.name }}</h4>
            <div class="columns">
                <div class="column is-2">Free slots:</div>
                <div class="column is-10">{{ parking.freeSlots }}</div>
            </div>
            <div class="columns">
                <div class="column is-2">Address:</div>
                <div class="column is-10">{{ parking.address }}</div>
            </div>
            <div class="columns">
                <div class="column is-2">Price:</div>
                <div class="column is-10">${{ parking.price }} per hour</div>
            </div>
            <div class="columns">
                <div class="column is-2">Additional info:</div>
                <div class="column is-10">{{ parking.additionalInfo }}</div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-button type="is-light" tag="router-link" to="/dashboard">Back to parking list</b-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { parkingService } from '../services';

export default {
    name: 'ParkingDetails',
    async created() {
        this.isLoading = true;
        this.parking = await parkingService.getParkingById(
            this.$route.params.id,
        );
        this.isLoading = false;
    },
    data() {
        return {
            isLoading: false,
            parking: {},
        };
    },
};
</script>

<style lang="scss" scoped>
.parking-details {
    position: relative;
    margin-top: 12px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
