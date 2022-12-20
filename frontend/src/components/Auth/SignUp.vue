<script setup lang="ts">
import { ref } from 'vue';
import { InputSignUp } from '../../utils/Types';
import useAuthStore from '../../store/Auth';

const AuthStore = useAuthStore();

const DataUser = ref<InputSignUp>({
  username: '', email: '', password: '', confirmPassword: '',
});

async function handleSubmit() {
  await AuthStore.SignUp(DataUser.value);
}
</script>

<template>
  <form class="container pb-5 pt-5" @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-3">Sign Up</h1>
      </div>
    </div>
    <div class="row justify-content-center" v-if="AuthStore.StateSignUp.msgError">
      <div class="col-lg-4">
        <div class="alert alert-warning d-flex align-items-center py-2 my-1" role="alert">
          <i class="bi bi-exclamation-triangle-fill mx-3" />
          <span class="text-capitalize">{{AuthStore.StateSignUp.msgError}}</span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="AuthStore.StateSignUp.msgSuccess">
      <div class="col-lg-4">
        <div class="alert alert-success d-flex align-items-center py-2 my-1" role="alert">
          <i class="bi bi-check2-circle mx-3 fs-4" />
          <span class="text-capitalize">
            {{AuthStore.StateSignUp.msgSuccess}}. Please <router-link to="/auth/signin" @click="() => AuthStore.StateSignUp.msgSuccess = ''">Sign In</router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="username" class="form-label w-100">
          <span class="ms-2">Username</span>
          <input type="text" id="username" class="form-control mt-2" placeholder="Username" v-model="DataUser.username">
        </label>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="email" class="form-label w-100">
          <span class="ms-2">E-mail</span>
          <input type="email" id="email" class="form-control mt-2" placeholder="E-mail" v-model="DataUser.email">
        </label>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="password" class="form-label w-100">
          <span class="ms-2">Password</span>
          <input type="password" id="password" class="form-control mt-2" placeholder="Password" v-model="DataUser.password">
        </label>
      </div>
    </div>
    <div class="row justify-content-center mb-2">
      <div class="col-lg-4">
        <label for="confirmPassword" class="form-label w-100">
          <span class="ms-2">Confirm Password</span>
          <input type="password" id="confirmPassword" class="form-control mt-2" placeholder="Confirm Password" v-model="DataUser.confirmPassword">
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
          Please <router-link to="/auth/signin">Sign In</router-link>, if you already exist account
        </p>
      </div>
    </div>
  </form>
</template>
