<script setup lang="ts">
import useAuthStore from '../../store/Auth';

const AuthStore = useAuthStore();
AuthStore.VerifyToken();
</script>

<template>
  <nav class="navbar navbar-expand-lg text-bg-primary px-3 px-lg-5">
    <div class="container-fluid">
      <a class="navbar-brand fs-3 fw-bold text-light" href="#">PostBlog</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-4">
          <li class="nav-item mx-2">
            <router-link class="nav-link fs-5 text-light" to="/">Home</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link fs-5 text-light" to="/about">About</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link fs-5 text-light" to="/posts">Posts</router-link>
          </li>
          <li class="nav-item mx-2" v-if="AuthStore.StateAuth.isAuth">
            <router-link class="nav-link fs-5 text-light" to="/dashboard/profile">Dashboard</router-link>
          </li>
          <li class="nav-item mx-2" v-else>
            <router-link class="nav-link fs-5 text-light" :class="$route.fullPath.includes('/signup') ? 'active' : ''" to="/auth/signin">
              Sign In
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active {
  font-weight: 700 !important;
}
</style>
