/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineStore } from 'pinia';
import axios from 'axios';
import { StateAuthStore, InputSignIn, InputSignUp } from '../utils/Types';

const AuthStore = defineStore('auth', {
  state: (): StateAuthStore => ({
    StateSignIn: {
      msgSuccess: '',
      isLoading: true,
      msgError: null,
    },
    StateSignUp: {
      msgSuccess: '',
      isLoading: true,
      msgError: null,
    },
    StateAuth: {
      isAuth: false,
      isLoading: true,
    },
  }),
  actions: {
    async SignUp(dataUser: InputSignUp) {
      try {
        const res = await axios.post('/api/user', dataUser);
        this.StateSignUp.msgSuccess = res.data.message;
        this.StateSignUp.isLoading = false;
        if (this.StateSignUp.msgError) this.StateSignUp.msgError = null;
      } catch (error: any) {
        if (error) this.StateSignUp.msgError = error.response.data.message;
      }
    },
    async SignIn(dataUser: InputSignIn) {
      try {
        const res = await axios.post('/api/user/auth', dataUser);
        this.StateSignIn.msgSuccess = res.data.message;
        this.StateSignIn.isLoading = false;
        if (this.StateSignIn.msgError) this.StateSignIn.msgError = null;
      } catch (error: any) {
        if (error) this.StateSignIn.msgError = error.response.data.message;
      }
    },
    async VerifyToken() {
      try {
        const res = await axios.get('/api/user/verify', { xsrfCookieName: 'token_user' });
        this.StateAuth.isAuth = res.data.isAuth;
        return res.data.isAuth;
      } catch (error: any) {
        if (error) this.StateAuth.isAuth = error.response.data.isAuth;
        return error.response.data.isAuth;
      }
    },
    async SignOut() {
      try {
        const res = await axios.get('/api/user/delete_token_user', { xsrfCookieName: 'token_user' });
        this.StateAuth.isAuth = res.data.isAuth;
        return res.data.isAuth; // false
      } catch (error: any) {
        if (error) this.StateAuth.isAuth = error.response.data.isAuth;
        return error.response.data.isAuth;
      }
    },
  },
});

export default AuthStore;
