<template>
    <div class="parking-details">
        <section class="section">
            <h4 class="title is-4">{{ parking.name }}</h4>
            <div class="columns">
                <div class="column is-2">Free slots:</div>
                <div class="column is-10">{{ parking.free_slots }}</div>
            </div>
            <div class="columns">
                <div class="column is-2">Total slots:</div>
                <div class="column is-10">{{ parking.total_slots }}</div>
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
                <div class="column is-2">Active:</div>
                <div class="column is-10">{{ parking.is_active }}</div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-button type="is-light" tag="router-link" to="/parkings">Back to parking list</b-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { parkingService } from '../services';
import store from '@/store';
import { TOAST_ERROR, LOADING } from '@/store/modules/buefy/buefy-action-types';

export default {
    name: 'ParkingDetails',
    async beforeRouteEnter(to, _from, next) {
        store.dispatch(LOADING, true);
        const { id } = to.params;
        try {
            const user = await parkingService.getParkingById(id);
            next(vm => (vm.parking = user.data));
        } catch (err) {
            store.dispatch(TOAST_ERROR, err.data.error);
            next(false);
        }
        store.dispatch(LOADING, false);
    },
    data() {
        return {
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
