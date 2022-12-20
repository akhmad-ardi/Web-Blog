<!-- eslint-disable no-underscore-dangle -->
<script setup lang="ts">
import useUserStore from '../../store/User';
import usePostStore from '../../store/Post';
// import SPORT from '../../assets/img/sport.jpg';
// import eSPORT from '../../assets/img/e-sport.jpg';
import { GetTime } from '../../utils/Functions';

const PostStore = usePostStore();
const UserStore = useUserStore();
await UserStore.GetUser();

if (UserStore.data) {
  await UserStore.GetUserPosts(UserStore.data._id);
}

function resetMsgSuccess() {
  PostStore.msgSuccess = null;
}
</script>

<template>
  <main class="container-fluid p-3">
    <h1 class="mb-3 text-center">Posts Dashboard</h1>

    <div class="row justify-content-center" v-if="PostStore.msgSuccess">
      <div class="col-lg-5">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <span class="text-capitalize">{{PostStore.msgSuccess}}</span>
          <button type="button" @click="resetMsgSuccess" class="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-4 g-3">
      <div v-for="post of UserStore.userPosts" :key="post._id" class="col">
        <div class="card h-100">
          <img :src="post.image" class="card-img-top" :alt="post.category">
          <div class="card-body">
            <h5 class="card-title text-center m-0">{{post.title}}</h5>
            <p class="card-text text-center m-0">{{post.category}}</p>
            <p class="card-text text-center m-0 text-muted">{{post.author}}</p>
            <p class="card-text">{{post.excerpt}}</p>
            <router-link :to="{ path: `/dashboard/posts/${post._id}` }" class="stretched-link" />
          </div>
          <div class="card-footer">
            <p class="m-0 text-muted">Created At {{GetTime(post.createdAt)}}</p>
            <p class="m-0 text-muted">Last Updated At {{GetTime(post.updatedAt)}}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <div class="card-body text-center">
            <div class="row h-100">
              <div class="col align-self-center">
                <router-link to="/dashboard/posts/add" class="btn btn-primary stretched-link">
                  <i class="bi bi-plus" />
                  Add Post
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
