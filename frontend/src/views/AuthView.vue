<script setup lang="ts">
import NavbarComp from '../components/Layout/NavbarComp.vue';
</script>

<template>
  <NavbarComp class="fixed-top" />
  <main class="container-fluid pt-5 bg-primary bg-opacity-25" style="height: 100vh">
    <router-view />
  </main>
</template>
