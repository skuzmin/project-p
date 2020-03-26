<script>
import store from '@/store';
import { TOAST_ERROR, TOAST_SUCCESS, LOADING } from '@/store/modules/buefy/buefy-action-types';
import { VERIFY } from '@/store/modules/auth/auth-action-types';

export default {
    name: 'Verify',
    beforeRouteEnter(to, from, next) {
        const { token } = to.query;
        if (token) {
            next(vm => vm.verifyUser(token));
        } else {
            store.dispatch(TOAST_ERROR, 'Token is missing');
            next('/login');
        }
    },
    methods: {
        verifyUser(token) {
            this.$store.dispatch(LOADING, true);
            this.$store
                .dispatch(VERIFY, token)
                .then(() => this.$store.dispatch(TOAST_SUCCESS, 'User has been successfully verified. Now you can login using your credentials.'))
                .catch(() => this.$store.dispatch(TOAST_ERROR, 'Wrong verification token'))
                .finally(() => {
                    this.$store.dispatch(LOADING, false);
                    this.$router.push('/login');
                });
        },
    },
    render: h => {
        return h();
    },
};
</script>
