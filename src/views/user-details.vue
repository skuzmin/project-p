<template>
    <div class="user-details">
        <section class="section">
            <div class="columns is-vcentered">
                <div class="column title-text is-2">{{ user.username }}</div>
                <div class="column is-10">
                    <b-button class="activate-btn" v-if="!user.isActive" type="is-info" @click="activateUser(user.id)">
                        Activate
                    </b-button>
                </div>
            </div>
            <div class="columns">
                <div class="column is-2">Email:</div>
                <div class="column is-10">{{ user.email }}</div>
            </div>
            <div class="columns">
                <div class="column is-2">Admin:</div>
                <div class="column is-10">{{ user.isAdmin }}</div>
            </div>
            <div class="columns">
                <div class="column is-2">Create date:</div>
                <div class="column is-10">{{ user.createDate }}</div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-button type="is-light" tag="router-link" to="/users">Back to users list</b-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { format } from 'date-fns';

import store from '@/store';
import { TOAST_ERROR, TOAST_SUCCESS, LOADING } from '@/store/modules/buefy/buefy-action-types';
import { userService } from '../services';

export default {
    name: 'UserDetails',
    async beforeRouteEnter(to, _from, next) {
        store.dispatch(LOADING, true);
        const { id } = to.params;
        try {
            const user = await userService.getUserById(id);
            next(vm => vm.formatData(user.data));
        } catch (err) {
            store.dispatch(TOAST_ERROR, err);
        }
        store.dispatch(LOADING, false);
    },
    data() {
        return {
            isLoading: false,
            user: {},
        };
    },
    methods: {
        formatData(u) {
            this.user = {
                id: u.id,
                username: u.username,
                email: u.email,
                isAdmin: u.is_admin,
                isActive: u.is_active,
                createDate: format(new Date(u.created_on), 'dd/MM/yyyy'),
            };
        },
        async activateUser(id) {
            store.dispatch(LOADING, true);
            try {
                await userService.activateUser(id);
                this.user.isActive = true;
                this.$store.dispatch(TOAST_SUCCESS, 'User has been successfully activated');
            } catch (err) {
                store.dispatch(TOAST_ERROR, err.data.error);
            }
            store.dispatch(LOADING, false);
        },
    },
};
</script>

<style lang="scss" scoped>
.user-details {
    margin-top: 30px;
    min-height: 300px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    .title-text {
        font-size: 28px;
        font-weight: 600;
    }
}
</style>
