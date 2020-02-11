<template>
    <div class="parking-list">
        <section class="section">
            <h4 class="title is-4">Parkings</h4>
            <b-table
                :data="data"
                :per-page="itemsPerPage"
                default-sort="name"
                paginated
                :loading="isLoading"
            >
                <template slot-scope="props">
                    <b-table-column field="name" label="Name" sortable>
                        <router-link :to="`/parking/${props.row.id}`">{{ props.row.name }}</router-link>
                    </b-table-column>

                    <b-table-column
                        field="freeSlots"
                        label="Free Slots"
                        sortable
                        width="150"
                        numeric
                    >{{ props.row.freeSlots }}</b-table-column>

                    <b-table-column
                        field="price"
                        label="Price($)"
                        numeric
                        width="130"
                        sortable
                    >{{ props.row.price }}</b-table-column>

                    <b-table-column
                        field="address"
                        label="Address"
                        sortable
                        width="550"
                    >{{ props.row.address }}</b-table-column>

                    <b-table-column width="30">
                        <b-icon
                            class="btn-icon"
                            icon="delete-outline"
                            @click.native="deleteParking(props.row.id, props.row.name)"
                        ></b-icon>
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </div>
</template>

<script>
import { parkingService } from '../services';

export default {
    name: 'ParkinList',
    async created() {
        this.isLoading = true;
        this.data = await parkingService.getParkings();
        this.isLoading = false;
    },
    data() {
        return {
            isLoading: false,
            data: [],
            itemsPerPage: 10,
        };
    },
    methods: {
        deleteParking(id, name) {
            this.$buefy.dialog.confirm({
                message: `Are you sure want to delete ${name} ?`,
                onConfirm: () => {
                    this.data = this.data.filter(p => p.id !== id);
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.parking-list {
    min-height: 500px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    .btn-icon {
        cursor: pointer;
    }
}
</style>
