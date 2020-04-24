<template>
    <div class="create-parking">
        <button class="button is-primary" @click="openModal()">Create parking</button>
        <b-modal :active.sync="isModalOpen" :width="500" :can-cancel="false">
            <b-loading :active.sync="isLoading"></b-loading>
            <div class="card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Create parking</p>
                </header>
                <section class="modal-card-body">
                    <b-field class="input-field" label="Name" :type="errors.name ? 'is-danger' : ''" :message="errors.name">
                        <b-input v-model="parking.name" placeholder="Name"></b-input>
                    </b-field>

                    <b-field class="input-field" label="Address" :type="errors.address ? 'is-danger' : ''" :message="errors.address">
                        <b-input v-model="parking.address" placeholder="Address"></b-input>
                    </b-field>

                    <b-field class="input-field" label="Total slots" :type="errors.totalSlots ? 'is-danger' : ''" :message="errors.totalSlots">
                        <b-input type="number" v-model="parking.totalSlots" placeholder="Total slots"></b-input>
                    </b-field>

                    <b-field class="input-field" label="Price" :type="errors.price ? 'is-danger' : ''" :message="errors.price">
                        <b-input type="number" v-model="parking.price" placeholder="Price"></b-input>
                    </b-field>

                    <div class="field">
                        <b-checkbox v-model="parking.isActive">Active</b-checkbox>
                    </div>
                </section>
                <footer class="modal-card-foot btn-group-right">
                    <button class="button" @click="close()">Cancel</button>
                    <button class="button is-primary" @click="create(parking)">Create</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { parkingService } from '../services';
import { TOAST_ERROR, TOAST_SUCCESS } from '../store/modules/buefy/buefy-action-types';

export default {
    name: 'CreateParkingModal',
    data() {
        return {
            isModalOpen: false,
            isLoading: false,
            parking: {},
            errors: {},
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        close() {
            this.isModalOpen = false;
            this.parking = {};
            this.errors = {};
        },
        async create(parking) {
            if (!this.validation(parking)) {
                return;
            }
            this.isLoading = true;
            try {
                const result = await parkingService.createParking(parking);
                parking.id = result.data.id;
                this.$emit('parkingCreated', parking);
                this.$store.dispatch(TOAST_SUCCESS, 'Parking has been successfully created');
                this.close();
            } catch (err) {
                this.$store.dispatch(TOAST_ERROR, err.data.error);
            }
            this.isLoading = false;
        },
        validation(parking) {
            let result = true;
            this.errors = {};
            if (!parking.name) {
                this.errors.name = 'Name is required';
                result = false;
            }
            if (!parking.address) {
                this.errors.address = 'Address is required';
                result = false;
            }
            if (isNaN(parking.totalSlots)) {
                this.errors.totalSlots = 'Please provide total slots for parking';
                result = false;
            }
            if (isNaN(parking.price)) {
                this.errors.price = 'Price is required';
                result = false;
            }
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
.create-parking {
    .btn-group-right {
        justify-content: flex-end;
    }
}
</style>
