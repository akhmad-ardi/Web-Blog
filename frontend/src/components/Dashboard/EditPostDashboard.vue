<!-- eslint-disable prefer-destructuring -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import slug from 'slug';
import { QuillEditor } from '@vueup/vue-quill';
import usePostStore from '../../store/post';
import useUserStore from '../../store/User';
import { Post } from '../../utils/Types';
// component
import ModalDeletePost from './ModalDeletePost.vue';

const Router = useRouter();
const route = useRoute();

const PostStore = usePostStore();
const UserStore = useUserStore();

await UserStore.GetUserPost(route.params.id as string);

let POST: Ref;
if (UserStore.userPost) POST = ref<Post>(UserStore.userPost);

function handleInputTitle(e: any) {
  POST.value.slug = slug(e.target.value);
}

function handleImage(e: any) {
  POST.value.image = e.target.files[0];
}

async function handleSumbit() {
  await PostStore.updatePost(route.params.id as string, POST.value);
  if (PostStore.msgSuccess) {
    PostStore.msgError = null;
    Router.push('/dashboard/posts');
  }
}
</script>

<template>
  <main class="container py-3">
    <div class="row">
      <div class="col-lg-5">
        <router-link to="/dashboard/posts" @click="PostStore.msgError = null" class="btn btn-outline-danger">
          <i class="bi bi-arrow-left" />
        </router-link>
      </div>
      <div class="col p-0">
        <h1 class="text-center text-lg-start">Edit Post</h1>
      </div>
    </div>
    <form class="container-fluid mt-3" @submit.prevent="handleSumbit">
      <div class="row justify-content-center" v-if="PostStore.msgError">
        <div class="col-lg-8">
          <div class="alert alert-danger text-capitalize text-center fs-5 fw-bold" role="alert">
            {{PostStore.msgError}}
          </div>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <!-- Title -->
          <label for="title" class="form-label w-100 mt-1">
            <span class="ms-1 fs-5">Title</span>
            <input
              type="text"
              id="title"
              class="form-control mt-1"
              v-model="POST.title"
              @input="handleInputTitle"
              placeholder="Title"
            >
          </label>
          <!-- Slug -->
          <label for="slug" class="form-label w-100 mt-1">
            <span class="ms-1 fs-5">Slug</span>
            <input type="text" class="form-control mt-1" id="slug" v-model="POST.slug" disabled readonly>
          </label>
          <!-- Category -->
          <label for="category" class="form-label w-100 mt-1">
            <span class="ms-1 fs-5">Category</span>
            <select id="category" class="form-select mt-1" v-model="POST.category">
              <option disabled>Select Category</option>
              <option value="sport">Sport</option>
              <option value="e-sport">E-Sport</option>
            </select>
          </label>
          <!-- Post -->
          <label for="post" class="form-label w-100 mt-1">
            <span class="ms-1 fs-5">Post</span>
            <QuillEditor v-model:content="POST.body" contentType="html" />
          </label>
          <!-- Image -->
          <label for="formFile" class="form-label w-100 mt-1">
            <span class="ms-1 fs-5">Upload Image</span>
            <input class="form-control mt-1" type="file" id="formFile" @change="handleImage">
          </label>
          <div class="row my-3 justify-content-center" v-if="typeof POST.image === 'string' && POST.image">
            <div class="col-lg-8">
              <img class="img-thumbnail w-100" :src="POST.image" :alt="POST.image">
            </div>
          </div>
          <!-- Submit -->
          <button type="submit" class="btn btn-primary w-100 mt-1">Submit</button>
          <!-- Delete Post -->
          <button type="button" class="btn btn-danger w-100 mt-1" data-bs-toggle="modal" data-bs-target="#deletePost">Delete Post</button>
          <ModalDeletePost :id="POST._id" />
        </div>
      </div>
    </form>
  </main>
</template>
