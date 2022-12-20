<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import usePostStore from '../../store/Post';
import SPORT from '../../assets/img/sport.jpg';
import eSPORT from '../../assets/img/e-sport.jpg';
import { GetTime } from '../../utils/Functions';

const PostStore = usePostStore();
if (PostStore.posts.length === 0) await PostStore.getPosts();
</script>

<template>
  <h1 class="text-center mb-3">Posts</h1>
  <div class="row row-cols-1 row-cols-lg-3 g-4">
    <div class="col" v-for="post of PostStore.posts" :key="post._id">
      <div class="card h-100">
        <img :src="post.category === 'sport' ? SPORT : eSPORT" class="card-img-top" :alt="post.category">
        <div class="card-body">
          <h5 class="card-title text-center m-0">{{post.title}}</h5>
          <p class="text-muted text-center text-uppercase m-0">{{post.category}}</p>
          <p class="text-dark text-center fw-bold my-1">Author: {{post.author}}</p>
          <p class="card-text">{{post.excerpt}}</p>
          <router-link :to="{ path: `/posts/${post.slug}` }" class="stretched-link" />
        </div>
        <div class="card-footer">
          <p class="m-0 text-muted">Created At {{GetTime(post.createdAt)}}</p>
          <p class="m-0 text-muted">Last Updated At {{GetTime(post.updatedAt)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
