<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../../store/User';
import { DataUserUpdate } from '../../utils/Types';

const Router = useRouter();
const UserStore = useUserStore();

const DataUser = ref<DataUserUpdate>({
  username: UserStore.data?.username as string,
  email: UserStore.data?.email as string,
  bio: UserStore.data?.bio as string,
  website: UserStore.data?.website as string,
  github: UserStore.data?.github as string,
  instagram: UserStore.data?.instagram as string,
  linkedin: UserStore.data?.linkedin as string,
});

async function handleSubmit() {
  await UserStore.UpdateUser(DataUser.value);
  if (UserStore.msgSuccess) {
    UserStore.msgError = null;
    Router.push('/dashboard/profile');
  }
}
</script>

<template>
  <h1 class="text-center mb-3">Edit Profile</h1>

  <form class="container-fluid" @submit.prevent="handleSubmit">
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="alert alert-danger text-capitalize" role="alert" v-if="UserStore.msgError">
          {{UserStore.msgError}}
        </div>
        <!-- Username -->
        <label for="username" class="form-label w-100 mb-3">
          <span class="ms-2">Username</span>
          <input type="text" id="username" class="form-control mt-1" v-model="DataUser.username" placeholder="Username">
        </label>
        <!-- E-mail -->
        <label for="email" class="form-label w-100 mb-3">
          <span class="ms-2">E-mail</span>
          <input type="email" id="email" class="form-control mt-1" v-model="DataUser.email" placeholder="E-mail@example.com">
        </label>
        <!-- Bio -->
        <label for="bio" class="form-label w-100 mb-3">
          <span class="ms-2">Bio</span>
          <textarea id="bio" class="form-control mt-1" rows="5" v-model="DataUser.bio" placeholder="About me" />
        </label>
        <!-- Gtihub -->
        <label for="github" class="form-label w-100 mb-3">
          <span class="ms-2">Github</span>
          <input type="text" id="github" class="form-control mt-1" v-model="DataUser.github" placeholder="https://github.com/your-github">
        </label>
        <!-- Website -->
        <label for="website" class="form-label w-100 mb-3">
          <span class="ms-2">Website</span>
          <input type="text" id="website" class="form-control mt-1" v-model="DataUser.website" placeholder="https://your-website.com">
        </label>
        <!-- LinkedIn -->
        <label for="linkedin" class="form-label w-100 mb-3">
          <span class="ms-2">LinkedIn</span>
          <input type="text" id="linkedin" class="form-control mt-1" v-model="DataUser.linkedin" placeholder="https://your-linkedin.com">
        </label>
        <!-- Instagram -->
        <label for="instagram" class="form-label w-100 mb-3">
          <span class="ms-2">Instagram</span>
          <input type="text" id="instagram" class="form-control mt-1" v-model="DataUser.instagram" placeholder="https://your-instagram.com">
        </label>
        <!-- Submit -->
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </div>
    </div>
  </form>
</template>
