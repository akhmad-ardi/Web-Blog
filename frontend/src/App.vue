<script setup lang="ts"></script>

<template>
  <Suspense>
    <router-view />

    <template #fallback>
      <h1 class="text-center my-5">Loading...</h1>
    </template>
  </Suspense>
</template>
