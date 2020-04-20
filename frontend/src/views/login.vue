<template>
    <div class="login p-panel">
        <section class="section">
            <h2 class="title has-text-centered is-3">Project-P</h2>
            <form @submit.prevent="login(user)">
                <div class="columns">
                    <div class="column">
                        <b-field class="input-field" label="Email" :type="errors.email ? 'is-danger' : ''" :message="errors.email">
                            <b-input v-model.trim="user.email"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-field class="input-field" label="Password" :type="errors.password ? 'is-danger' : ''" :message="errors.password">
                            <b-input v-model="user.password" type="password" password-reveal></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns btn-group">
                    <div class="column">
                        <div class="buttons">
                            <b-button class="login-btn" type="is-primary" outlined native-type="submit">Login</b-button>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="buttons">
                            <b-button tag="router-link" to="/registration" type="is-text has-text-info">Registration</b-button>
                            <b-button tag="router-link" to="/forgot-password" type="is-text right has-text-info">Forgot your password?</b-button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import { AUTH_LOGIN } from '@/store/modules/auth/auth-action-types';
import { LOADING, TOAST_ERROR } from '@/store/modules/buefy/buefy-action-types';
import { LOGIN_EMAIL_REQUIRED, LOGIN_PASSWORD_REQUIRED } from '@/shared/constants';

export default {
    name: 'Login',
    data() {
        return {
            user: {},
            errors: {},
        };
    },
    methods: {
        login(user) {
            if (!this.validation(user)) {
                return;
            }
            this.$store.dispatch(LOADING, true);
            this.$store
                .dispatch(AUTH_LOGIN, user)
                .then(() => this.$router.push('/dashboard'))
                .catch(err => {
                    if (err.data && err.data.error) {
                        this.$store.dispatch(TOAST_ERROR, err.data.error);
                    }
                })
                .finally(() => this.$store.dispatch(LOADING, false));
        },
        validation(user) {
            let result = true;
            this.errors = {};
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
.login {
    .login-btn {
        width: 100%;
    }
    .columns {
        margin-bottom: 0;
    }
    .btn-group {
        margin-top: 12px;
    }
}
</style>
