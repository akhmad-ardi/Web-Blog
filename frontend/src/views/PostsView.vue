<script setup lang="ts">
import NavbarComp from '../components/Layout/NavbarComp.vue';
</script>

<template>
  <NavbarComp />
  <main class="container pt-4 pb-3 px-5">
    <Suspense>
      <!-- Posts -->
      <router-view />

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
  </main>
</template>
