<template>
    <div class="forgot-password p-panel">
        <section class="section" v-if="!isEmailSent && !token">
            <h2 class="title has-text-centered is-3">Forgot password?</h2>
            <h2 class="title has-text-centered is-6">Enter your email address below and we'll get you back on track.</h2>
            <form @submit.prevent="sendEmail(email)">
                <div class="columns">
                    <div class="column">
                        <b-field class="input-field" label="Email" :type="emailError ? 'is-danger' : ''" :message="emailError">
                            <b-input v-model.trim="email"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="buttons">
                            <b-button class="login-btn" type="is-primary" outlined native-type="submit">Send</b-button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="columns has-text-right">
                <div class="column">
                    <b-button tag="router-link" type="is-text has-text-info" to="/login">Back to login</b-button>
                </div>
            </div>
        </section>
        <section class="section" v-if="isEmailSent && !token">
            <h2 class="title has-text-centered is-4">Email with instructions has been sent.</h2>
            <div class="columns has-text-centered">
                <div class="column">
                    <b-button tag="router-link" type="is-text right has-text-info" to="/login">Back to login</b-button>
                </div>
            </div>
        </section>
        <section class="section" v-if="token">
            <h2 class="title has-text-centered is-3">Set new password</h2>
            <div class="columns">
                <div class="column">
                    <b-field class="input-field" label="Password" :type="passwordError ? 'is-danger' : ''" :message="passwordError">
                        <b-input autocomplete="new-password" type="password" v-model.trim="password.new"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-field class="input-field" label="Confirm password" :type="repasswordError ? 'is-danger' : ''" :message="repasswordError">
                        <b-input autocomplete="new-password" type="password" v-model.trim="password.confirm"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="buttons">
                        <b-button class="login-btn" type="is-primary" outlined @click="setPassword(password)">Save</b-button>
                    </div>
                </div>
            </div>
            <div class="columns has-text-right">
                <div class="column">
                    <b-button tag="router-link" type="is-text has-text-info" to="/login">Back to login</b-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { LOADING, TOAST_ERROR, TOAST_SUCCESS } from '@/store/modules/buefy/buefy-action-types';
import { FORGOT_PASSWORD, SET_PASSWORD } from '@/store/modules/auth/auth-action-types';

export default {
    name: 'ForgotPassword',
    beforeRouteEnter(to, from, next) {
        const { token } = to.query;
        if (token) {
            next(vm => (vm.token = token));
        } else {
            next();
        }
    },
    data() {
        return {
            email: '',
            token: '',
            emailError: '',
            passwordError: '',
            repasswordError: '',
            password: {
                new: '',
                confirm: '',
            },
            isEmailSent: false,
        };
    },
    methods: {
        sendEmail(email) {
            this.emailError = '';
            if (!email) {
                this.emailError = 'Email is required';
                return;
            }
            this.$store.dispatch(LOADING, true);
            this.$store
                .dispatch(FORGOT_PASSWORD, email)
                .then(() => {
                    this.$store.dispatch(TOAST_SUCCESS, 'Email with instructions has been sent');
                })
                .catch(() => this.$store.dispatch(TOAST_ERROR, 'Something went wrong'))
                .finally(() => {
                    this.$store.dispatch(LOADING, false);
                    this.isEmailSent = true;
                });
        },
        setPassword(password) {
            if (!password.new) {
                this.passwordError = 'Password is required';
                return;
            }
            if (password.new !== password.confirm) {
                this.repasswordError = 'Password and Confirm password must be the same';
                return;
            }
            this.$store.dispatch(LOADING, true);
            this.$store
                .dispatch(SET_PASSWORD, { password: password.new, token: this.token })
                .then(() => {
                    this.$store.dispatch(TOAST_SUCCESS, 'New password has been successfully updated');
                    this.$router.push('/login');
                })
                .catch(err => this.$store.dispatch(TOAST_ERROR, err.data.error))
                .finally(() => this.$store.dispatch(LOADING, false));
        },
    },
};
</script>

<style lang="scss" scoped>
.forgot-password {
    .login-btn {
        width: 100%;
    }
    .columns {
        margin-bottom: 0;
    }
}
</style>
