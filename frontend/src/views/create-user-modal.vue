<template>
    <div class="create-user">
        <button class="button is-primary" @click="openModal()">Create user</button>
        <b-modal :active.sync="isModalOpen" :width="500" :can-cancel="false">
            <b-loading :active.sync="isLoading"></b-loading>
            <div class="card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Create user</p>
                </header>
                <section class="modal-card-body">
                    <b-field class="input-field" label="Username" :type="errors.username ? 'is-danger' : ''" :message="errors.username">
                        <b-input v-model="user.username" placeholder="Username"></b-input>
                    </b-field>

                    <b-field class="input-field" label="Email" :type="errors.email ? 'is-danger' : ''" :message="errors.email">
                        <b-input v-model="user.email" placeholder="Email"></b-input>
                    </b-field>

                    <b-field class="input-field" label="Password" :type="errors.password ? 'is-danger' : ''" :message="errors.password">
                        <b-input type="password" autocomplete="new-password" v-model="user.password" placeholder="Password"></b-input>
                    </b-field>

                    <div class="field">
                        <b-checkbox v-model="user.isActive">Active</b-checkbox>
                    </div>

                    <div class="field">
                        <b-checkbox v-model="user.isAdmin">Admin</b-checkbox>
                    </div>
                </section>
                <footer class="modal-card-foot btn-group-right">
                    <button class="button" @click="close()">Cancel</button>
                    <button class="button is-primary" @click="create(user)">Create</button>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { userService } from '../services';
import { TOAST_ERROR, TOAST_SUCCESS } from '../store/modules/buefy/buefy-action-types';
import { LOGIN_EMAIL_REQUIRED, LOGIN_PASSWORD_REQUIRED, USERNAME_REQUIRED } from '@/shared/constants';

export default {
    name: 'CreateUserModal',
    data() {
        return {
            isModalOpen: false,
            isLoading: false,
            user: {
                username: '',
                email: '',
                password: '',
                isActive: false,
                isAdmin: false,
            },
            errors: {},
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        close() {
            this.isModalOpen = false;
            this.user = {};
            this.errors = {};
        },
        async create(user) {
            if (!this.validation(user)) {
                return;
            }
            this.isLoading = true;
            try {
                const result = await userService.createUser(user);
                user.id = result.data.id;
                this.$emit('userCreated', user);
                this.isModalOpen = false;
                this.$store.dispatch(TOAST_SUCCESS, 'User has been successfully created');
            } catch (e) {
                this.$store.dispatch(TOAST_ERROR, e);
            }
            this.isLoading = false;
        },
        validation(user) {
            let result = true;
            this.errors = {};
            if (!user.username) {
                this.errors.username = USERNAME_REQUIRED;
                result = false;
            }
            if (!user.email) {
                this.errors.email = LOGIN_EMAIL_REQUIRED;
                result = false;
            }
            if (!user.password) {
                this.errors.password = LOGIN_PASSWORD_REQUIRED;
                result = false;
            }
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
.create-user {
    .btn-group-right {
        justify-content: flex-end;
    }
}
</style>
