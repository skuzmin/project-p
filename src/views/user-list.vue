<template>
    <div class="user-list">
        <section class="section">
            <h4 class="title is-4">Users</h4>
            <b-table :data="users" :per-page="itemsPerPage" default-sort="name" paginated :loading="isLoading">
                <template slot-scope="props">
                    <b-table-column field="username" label="User" sortable>
                        <router-link :to="`/user/${props.row.id}`">{{ props.row.username }}</router-link>
                    </b-table-column>

                    <b-table-column field="email" label="Email" sortable width="350">{{ props.row.email }}</b-table-column>

                    <b-table-column field="isAdmin" label="Admin" width="130" sortable>
                        <b-icon class="has-text-primary" icon="check" v-if="props.row.isAdmin"></b-icon>
                    </b-table-column>

                    <b-table-column field="createDate" label="Create Date" sortable width="250">{{ props.row.createDate }}</b-table-column>

                    <b-table-column width="30">
                        <b-icon
                            v-if="currentUser.is_admin"
                            class="btn-icon has-text-primary"
                            icon="delete-outline"
                            :class="{ disabled: isCurrentUser(props.row.id) }"
                            @click.native="deleteUser(props.row)"
                        ></b-icon>
                    </b-table-column>
                </template>
            </b-table>
        </section>
    </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters } from 'vuex';

import { userService } from '../services';
import store from '../store';
import { TOAST_ERROR, LOADING } from '../store/modules/buefy/buefy-action-types';

export default {
    name: 'UserList',
    async beforeRouteEnter(_to, _from, next) {
        store.dispatch(LOADING, true);
        try {
            const users = await userService.getUsers();
            next(vm => vm.formatData(users.data));
        } catch (e) {
            next(false);
        }
        store.dispatch(LOADING, false);
    },
    data() {
        return {
            isLoading: false,
            users: [],
            itemsPerPage: 10,
        };
    },
    methods: {
        deleteUser(user) {
            if (user.isAdmin) {
                return;
            }
            this.$buefy.dialog.confirm({
                message: `Are you sure want to delete user: ${user.username} ?`,
                onConfirm: async () => {
                    this.isLoading = true;
                    try {
                        await userService.deleteUser(user.id);
                        this.users = this.users.filter(p => p.id !== user.id);
                    } catch (e) {
                        this.$store.dispatch(TOAST_ERROR, e);
                    }
                    this.isLoading = false;
                },
            });
        },
        isCurrentUser(id) {
            return this.currentUser.id === id;
        },
        formatData(users) {
            users.forEach(u => {
                this.users.push({
                    id: u.id,
                    username: u.username,
                    email: u.email,
                    isAdmin: u.is_admin,
                    createDate: format(new Date(u.created_on), 'dd/MM/yyyy'),
                });
            });
        },
    },
    computed: {
        ...mapGetters(['currentUser']),
        isTableEmpty() {
            return !this.users.length && !this.isLoading;
        },
    },
};
</script>

<style lang="scss" scoped>
.user-list {
    margin-top: 30px;
    min-height: 300px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    .btn-icon {
        cursor: pointer;
    }
    .disabled {
        pointer-events: none;
        opacity: 0.7;
    }
}
</style>
