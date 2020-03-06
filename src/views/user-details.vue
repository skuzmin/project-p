<template>
    <div class="user-details">
        <b-loading :active.sync="isLoading"></b-loading>
        <section class="section">
            <h4 class="title is-4">{{ user.username }}</h4>
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

import { userService } from '../services';

export default {
    name: 'UserDetails',
    async created() {
        this.isLoading = true;
        const user = await userService.getUserById(this.$route.params.id);
        this.formatData(user);
        this.isLoading = false;
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
                createDate: format(new Date(u.created_on), 'dd/MM/yyyy'),
            };
        },
    },
};
</script>

<style lang="scss" scoped></style>
