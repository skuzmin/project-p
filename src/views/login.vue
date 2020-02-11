<template>
    <div class="login">
        <section class="section">
            <h2 class="title has-text-centered is-3">Project-P</h2>
            <form @submit.prevent="login(user)">
                <div class="columns">
                    <div class="column">
                        <b-field
                            label="Email"
                            :type="errors.email ? 'is-danger' : ''"
                            :message="errors.email"
                        >
                            <b-input v-model.trim="user.email"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-field
                            label="Password"
                            :type="errors.password ? 'is-danger' : ''"
                            :message="errors.password"
                        >
                            <b-input v-model="user.password"></b-input>
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
                            >Login</b-button>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="buttons">
                            <b-button type="is-text has-text-info" @click="tbd()">Register</b-button>
                            <b-button
                                type="is-text right has-text-info"
                                @click="tbd()"
                            >Forgot your password?</b-button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {},
            errors: {},
        };
    },
    methods: {
        tbd() {
            alert('TO BE DONE...MAYBE...SOMETIME...qq ;');
        },
        login(user) {
            if (!this.validation(user)) {
                return;
            }
            localStorage.setItem('p-login', true);
            this.$router.push('/dashboard');
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
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    width: 500px;
    margin: 24vh auto;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    .login-btn {
        width: 100%;
    }
    .right {
        margin-left: auto;
    }
}
</style>
