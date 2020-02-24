<template>
    <div class="forgot-password p-panel">
        <section class="section" v-if="!isEmailSent">
            <h2 class="title has-text-centered is-3">Forgot password?</h2>
            <h2 class="title has-text-centered is-6">
                Enter your email address below and we'll get you back on track.
            </h2>
            <form @submit.prevent="sendEmail(email)">
                <div class="columns">
                    <div class="column">
                        <b-field
                            class="input-field"
                            label="Email"
                            :type="emailError ? 'is-danger' : ''"
                            :message="emailError"
                        >
                            <b-input v-model.trim="email"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="buttons">
                            <b-button
                                class="login-btn"
                                type="is-primary"
                                outlined
                                native-type="submit"
                                >Send</b-button
                            >
                        </div>
                    </div>
                </div>
            </form>
            <div class="columns has-text-right">
                <div class="column">
                    <b-button
                        tag="router-link"
                        type="is-text has-text-info"
                        to="/login"
                    >Back to login</b-button>
                </div>
            </div>
        </section>
        <section class="section" v-if="isEmailSent">
            <h2 class="title has-text-centered is-4">
                Email with instructions has been sent.
            </h2>
            <div class="columns has-text-centered">
                <div class="column">
                    <b-button
                        tag="router-link"
                        type="is-text right has-text-info"
                        to="/login"
                        >Back to login</b-button
                    >
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: '',
            emailError: '',
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
            this.isEmailSent = true;
            console.log(email);
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
