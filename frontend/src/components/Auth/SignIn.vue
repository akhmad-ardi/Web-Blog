<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { InputSignIn } from '../../utils/Types';
import useAuthStore from '../../store/Auth';

const Router = useRouter();
const AuthStore = useAuthStore();

const DataUser = ref<InputSignIn>({ email: '', password: '' });

async function handleSubmit() {
  await AuthStore.SignIn(DataUser.value);
  if (AuthStore.StateSignIn.msgSuccess) {
    await AuthStore.VerifyToken();
    if (AuthStore.StateAuth.isAuth) Router.push('/');
  }
}
</script>

<template>
  <form class="container py-5" @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-3">Sign In</h1>
      </div>
    </div>
    <div class="row justify-content-center" v-if="AuthStore.StateSignIn.msgError">
      <div class="col-lg-4">
        <div class="alert alert-warning d-flex align-items-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill mx-3" />
          <span class="text-capitalize">{{AuthStore.StateSignIn.msgError}}</span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="email" class="form-label w-100">
          <span class="ms-2">E-mail</span>
          <input type="email" id="email" class="form-control mt-2" placeholder="E-mail" v-model="DataUser.email" />
        </label>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="password" class="form-label w-100">
          <span class="ms-2">Password</span>
          <input type="password" id="password" class="form-control mt-2" placeholder="Password" v-model="DataUser.password" />
        </label>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <p class="text-center mt-3">
          Please <router-link to="/auth/signup">Sign Up</router-link>, if you don't have account
        </p>
      </div>
    </div>
  </form>
</template>
