import interceptorsSetup from './interceptors';
import store from '../store';
import { AUTH_CHECK } from '../store/modules/auth/auth-action-types';

export default function() {
    interceptorsSetup();
    store.dispatch(AUTH_CHECK);
}
