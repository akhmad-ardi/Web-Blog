<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavbarDashboard from '../components/Layout/NavbarDashboard.vue';
import useUserStore from '../store/User';

const Route = useRoute();
const UserStore = useUserStore();

if (UserStore.isLoading) {
  await UserStore.GetUser();
}
</script>

<template>
  <header class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Dashboard</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" v-if="Route.fullPath === '/dashboard/posts'">
  </header>

  <div class="container-fluid">
    <div class="row">
      <NavbarDashboard />

      <main class="col-md-9 ms-sm-auto col-lg-10 p-0">
        <router-view />
      </main>
    </div>
  </div>
  <Suspense>

    <!-- Loading -->
    <template #fallback>
      <div class="row justify-content-center">
        <div class="col-lg-1">
          <div class="spinner-border text-primary text-center" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </template>
  </Suspense>
</template>

<style scoped>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(var(--bs-primary-rgb), .25);
  border-color: rgba(var(--bs-primary-rgb), .25);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(var(--bs-dark-rgb), .25);
}
</style>
