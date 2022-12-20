<script setup lang="ts">
import { useRoute } from 'vue-router';
import usePostStore from '../../store/Post';

const Route = useRoute();
const PostStore = usePostStore();

await PostStore.getPost(Route.params.slug as unknown as string);

const Post = PostStore.post;
</script>

<template>
  <main class="container">
    <h1 class="text-center">{{Post?.title}}</h1>
    <h5 class="text-center text-muted">{{Post?.category}}</h5>
    <h4 class="text-center text-">Author: {{Post?.author}}</h4>
    <div v-html="Post?.body" />
  </main>
</template>
