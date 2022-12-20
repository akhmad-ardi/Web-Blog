<script setup lang="ts"></script>

<template>
  <h1 class="text-center mb-3">Settings</h1>

  <div class="row justify-content-center">
    <div class="col-lg-7">
      <ul class="list-group list-group-flush">
        <li class="list-group-item py-2 d-flex justify-content-between">
          <span class="fs-5 align-self-center">Update Profile</span>
          <router-link to="/dashboard/settings/profile" class="btn btn-outline-primary fs-6">Update Profile</router-link>
        </li>
        <li class="list-group-item py-2 d-flex justify-content-between">
          <span class="fs-5 align-self-center">Update Password</span>
          <router-link to="/dashboard/settings/password" class="btn btn-outline-primary fs-6">Update Password</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
