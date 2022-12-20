/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineStore } from 'pinia';
import axios from 'axios';
import { StateUser, DataUserUpdate, DataNewPassword } from '../utils/Types';

const UserStore = defineStore('user', {
  state: (): StateUser => ({
    data: null,
    userPosts: [],
    userPost: null,
    msgError: null,
    msgSuccess: null,
  }),
  actions: {
    async GetUser() {
      try {
        const res = await axios.get('/api/user', { xsrfCookieName: 'token_user' });
        this.data = res.data.data;
      } catch (error: any) {
        if (error) this.msgError = error.response.data.message;
      }
    },
    async GetUserPosts(user_id: string) {
      try {
        const res = await axios.get(`/api/post?user_id=${user_id}`);
        this.userPosts = res.data.data;
      } catch (error) {
        this.msgError = error;
      }
    },
    async GetUserPost(id: string) {
      try {
        const res = await axios.get(`/api/post/id/${id}`);
        this.userPost = res.data.data;
      } catch (error) {
        if (error) this.msgError = error;
      }
    },
    async UpdateUser(dataUser: DataUserUpdate) {
      try {
        const res = await axios.put('/api/user', dataUser, { xsrfCookieName: 'token_user' });
        this.msgSuccess = res.data.message;
      } catch (error: any) {
        if (error) this.msgError = error.response.data.message;
      }
    },
    async UpdatePassword(newPassword: DataNewPassword) {
      try {
        const res = await axios.patch('/api/user', newPassword, { xsrfCookieName: 'token_user' });
        this.msgSuccess = res.data.message;
      } catch (error: any) {
        if (error) this.msgError = error.response.data.message;
      }
    },
  },
});

export default UserStore;
