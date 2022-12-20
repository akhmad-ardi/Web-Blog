<script setup lang="ts">
import { ref, Ref } from 'vue';
import useUserStore from '../../store/User';
import { DataNewPassword } from '../../utils/Types';

const UserStore = useUserStore();

const NewPassword: Ref = ref<DataNewPassword>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

async function EditPassword() {
  if (UserStore.msgError) UserStore.msgError = null;
  if (UserStore.msgSuccess) UserStore.msgSuccess = null;
  await UserStore.UpdatePassword(NewPassword.value);
}
</script>

<template>
  <h1 class="text-center" :class="UserStore.msgError || UserStore.msgSuccess ? 'mb-3' : 'mb-5'">Edit Password</h1>
  <form class="row justify-content-center" @submit.prevent="EditPassword">
    <div class="col-lg-5">
      <div v-show="UserStore.msgSuccess" class="alert alert-success text-capitalize mt-0 mb-1" role="alert">
        {{ UserStore.msgSuccess }}. <router-link to="/dashboard/profile">Profile</router-link>
      </div>
      <div v-show="UserStore.msgError" class="alert alert-danger text-capitalize mt-0 mb-1" role="alert">
        {{ UserStore.msgError }}
      </div>
      <label for="oldPassword" class="form-label w-100">
        <span class="ms-2">Old Password</span>
        <input type="password" id="oldPassword" class="form-control mt-2" placeholder="Old Password" v-model="NewPassword.oldPassword">
      </label>
      <label for="newPassword" class="form-label w-100">
        <span class="ms-2">New Password</span>
        <input type="password" id="newPassword" class="form-control mt-2" placeholder="New Password" v-model="NewPassword.newPassword">
      </label>
      <label for="confirmPassword" class="form-label w-100">
        <span class="ms-2">Confirm Password</span>
        <input type="password" id="confirmPassword" class="form-control mt-2" placeholder="Old Password" v-model="NewPassword.confirmPassword">
      </label>
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </div>
  </form>
</template>
