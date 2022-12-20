<!-- eslint-disable prefer-destructuring -->
<!-- eslint-disable vue/valid-v-model -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { QuillEditor } from '@vueup/vue-quill';
import slug from 'slug';
import useUserStore from '../../store/User';
import usePostStore from '../../store/Post';
import staticData from '../../utils/StaticData';
import { AddPost } from '../../utils/Types';

const Router = useRouter();
const UserStore = useUserStore();
const PostStore = usePostStore();

let NewPost: Ref;
if (UserStore.data) {
  NewPost = ref<AddPost>({
    title: '', image: '', slug: '', category: '', body: '', author: UserStore.data.username,
  });
}

function handleInputTitle(e: any) {
  NewPost.value.slug = slug(e.target.value);
}

function handleImage(e: any) {
  NewPost.value.image = e.target.files[0];
}

async function handleSubmit() {
  await PostStore.addPost(NewPost.value);
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
        <h1 class="text-center text-lg-start m-0">Add Post</h1>
      </div>
    </div>
    <form class="container-fluid mt-3" @submit.prevent="handleSubmit">
      <div class="row justify-content-center" v-if="PostStore.msgError">
        <div class="col-lg-8">
          <div class="alert alert-danger text-capitalize text-center fs-5 fw-bold" role="alert">
            {{PostStore.msgError}}
          </div>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <label for="title" class="form-label w-100">
            <span class="ms-1 fs-5">Title</span>
            <input
              type="text"
              id="title"
              class="form-control mt-1"
              v-model="NewPost.title"
              @input="handleInputTitle"
              placeholder="Title" />
          </label>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <label for="slug" class="form-label w-100">
            <span class="ms-1 fs-5">Slug</span>
            <input type="text" id="slug" class="form-control mt-1" v-model="NewPost.slug" placeholder="Slug" disabled readonly />
          </label>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <span class="ms-1 fs-5">Category</span>
          <label for="category" class="form-label w-100">
            <select id="category" class="form-control text-capitalize" v-model="NewPost.category">
              <option value="" class="text-capitalize" default disabled>Select Category</option>
              <option v-for="(category, index) in staticData.categories" :key="index" :value="category" class="text-capitalize">{{ category }}</option>
            </select>
          </label>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <label for="post" class="form-label w-100">
            <span class="ms-1 fs-5">Post</span>
            <QuillEditor v-model:content="NewPost.body" contentType="html" />
          </label>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <label for="formFile" class="form-label w-100">
            <span class="ms-1 fs-5">Upload Image</span>
            <input class="form-control mt-1" type="file" id="formFile" @change="handleImage">
          </label>
        </div>
      </div>
      <div class="row mb-2 justify-content-center">
        <div class="col-lg-8">
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </div>
      </div>
    </form>
  </main>
</template>
