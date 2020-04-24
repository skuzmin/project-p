<template>
    <div class="parking-list">
        <section class="section">
            <div class="table-header">
                <h4 class="title is-4">Parkings</h4>
                <CreateParkingModal v-on:parkingCreated="addParking($event)" />
            </div>
            <b-table :data="parkings" :per-page="itemsPerPage" default-sort="name" paginated :loading="isLoading">
                <template slot-scope="props">
                    <b-table-column field="name" label="Name" sortable>
                        <router-link :to="`/parkings/${props.row.id}`">{{ props.row.name }}</router-link>
                    </b-table-column>

                    <b-table-column field="freeSlots" label="Free Slots" sortable width="150" numeric>{{ props.row.freeSlots }}</b-table-column>

                    <b-table-column field="price" label="Price($)" numeric width="130" sortable>{{ props.row.price }}</b-table-column>

                    <b-table-column field="address" label="Address" sortable width="550">{{ props.row.address }}</b-table-column>

                    <b-table-column field="isActive" label="Active" width="130" sortable>
                        <b-icon class="has-text-primary" icon="check" v-if="props.row.isActive"></b-icon>
                    </b-table-column>

                    <b-table-column width="30">
                        <b-icon class="btn-icon" icon="delete-outline" @click.native="deleteParking(props.row)"></b-icon>
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </div>
</template>

<script>
import { parkingService } from '../services';
import store from '../store';
import { LOADING, TOAST_ERROR, TOAST_SUCCESS } from '../store/modules/buefy/buefy-action-types';
import CreateParkingModal from './create-parking-modal';

export default {
    name: 'ParkinList',
    components: { CreateParkingModal },
    async beforeRouteEnter(_to, _from, next) {
        store.dispatch(LOADING, true);
        try {
            const parkings = await parkingService.getParkings();
            next(vm => vm.formatData(parkings.data));
        } catch (e) {
            next(false);
        }
        store.dispatch(LOADING, false);
    },
    data() {
        return {
            isLoading: false,
            parkings: [],
            itemsPerPage: 10,
        };
    },
    methods: {
        addParking(parking) {
            this.parkings.push(parking);
        },
        deleteParking(parking) {
            this.$buefy.dialog.confirm({
                message: `Are you sure want to delete parking: ${parking.name} ?`,
                onConfirm: async () => {
                    this.isLoading = true;
                    try {
                        await parkingService.deleteParking(parking.id);
                        this.parkings = this.parkings.filter(p => p.id !== parking.id);
                        this.$store.dispatch(TOAST_SUCCESS, 'Parking has been deleted');
                    } catch (e) {
                        this.$store.dispatch(TOAST_ERROR, e);
                    }
                    this.isLoading = false;
                },
            });
        },
        formatData(parkings) {
            this.parkings = parkings.map(p => ({
                id: p.id,
                address: p.address,
                freeSlots: p.free_slots,
                price: p.price,
                name: p.name,
                isActive: p.is_active,
            }));
        },
    },
};
</script>

<style lang="scss" scoped>
.parking-list {
    margin-top: 30px;
    min-height: 300px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    .btn-icon {
        cursor: pointer;
    }
    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
        .title {
            margin-bottom: 0;
        }
    }
}
</style>
