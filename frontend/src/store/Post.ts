/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import axios from 'axios';
import { StatePosts, AddPost, Post } from '../utils/Types';

const PostStore = defineStore('posts', {
  state: (): StatePosts => ({
    posts: [],
    post: null,
    msgError: null,
    msgSuccess: null,
  }),
  actions: {
    async getPosts() {
      try {
        const res = await axios.get('/api/post');
        this.posts = res.data.data;
      } catch (error) {
        this.msgError = error;
      }
    },
    async getPost(slug: string) {
      try {
        const res = await axios.get(`/api/post/slugs/${slug}`);
        this.post = res.data.data;
      } catch (error) {
        this.msgError = error;
      }
    },
    async addPost(dataPost: AddPost) {
      try {
        const res = await axios.post('/api/post', dataPost, {
          xsrfCookieName: 'token_user',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.msgSuccess = res.data.message;
      } catch (error: any) {
        this.msgError = error.response.data.message;
      }
    },
    async updatePost(id: string, dataPost: Post) {
      try {
        const res = await axios.patch(`/api/post/${id}`, dataPost, {
          xsrfCookieName: 'token_user',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.msgSuccess = res.data.message;
      } catch (error: any) {
        if (error) this.msgError = error.response.data.message;
      }
    },
    async deletePost(id: string) {
      try {
        const res = await axios.delete(`/api/post/${id}`, { xsrfCookieName: 'token_user' });
        this.msgSuccess = res.data.message;
      } catch (error) {
        console.log(error);
        if (error) this.msgError = error;
      }
    },
  },
});

export default PostStore;
