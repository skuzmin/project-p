<template>
    <div class="register p-panel">
        <section class="section" v-if="!isRegisterCompleted">
            <h2 class="title has-text-centered is-3">Registration</h2>
            <form @submit.prevent="register(user)">
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
                            <b-input autocomplete="new-password" v-model="user.password" type="password"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-field
                            class="input-field"
                            label="Confirm password"
                            :type="errors.repassword ? 'is-danger' : ''"
                            :message="errors.repassword"
                        >
                            <b-input autocomplete="new-password" v-model="user.repassword" type="password"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns btn-group">
                    <div class="column">
                        <div class="buttons">
                            <b-button class="login-btn" type="is-primary" outlined native-type="submit">Register</b-button>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="buttons">
                            <b-button tag="router-link" type="is-text right has-text-info" to="/login">Back to login</b-button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
        <section class="section" v-if="isRegisterCompleted">
            <h2 class="title has-text-centered is-4">
                Registration has been completed.
            </h2>
            <div class="columns has-text-centered">
                <div class="column">
                    Please check your email for a confirmation.
                </div>
            </div>
            <div class="columns has-text-centered">
                <div class="column">
                    <b-button tag="router-link" type="is-text right has-text-info" to="/login">Back to login</b-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            user: {
                email: '',
                password: '',
                repassword: '',
            },
            errors: {},
            isRegisterCompleted: false,
        };
    },
    methods: {
        register(user) {
            if (!this.validation(user)) {
                return;
            }
            this.isRegisterCompleted = true;
        },
        validation(user) {
            let result = true;
            this.errors = {};
            if (!user.email) {
                this.errors.email = 'Email required';
                result = false;
            }
            if (!user.password) {
                this.errors.password = 'Password required';
                result = false;
            }
            if (user.password !== user.repassword) {
                this.errors.repassword = 'Password and Confirm password must be the same';
                result = false;
            }
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
.register {
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
