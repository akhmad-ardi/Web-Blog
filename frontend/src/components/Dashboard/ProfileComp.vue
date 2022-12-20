<script setup lang="ts">
import useUserStore from '../../store/User';
import IMAGE from '../../assets/img/profile.jpg';
import IMAGEPERSON from '../../assets/img/person.jpg';

const UserStore = useUserStore();
if (!UserStore.data || UserStore.msgSuccess) {
  UserStore.msgSuccess = null;
  await UserStore.GetUser();
}
</script>

<template>
  <img :src="IMAGE" class="img-fluid" alt="Profile Image">
  <div class="col-lg-4 position-relative">
    <img :src="IMAGEPERSON" class="mt-4 position-absolute top-0 start-50 translate-middle" alt="Person image">
  </div>
  <div class="col-lg-10 position-relative" v-if="UserStore.data">
    <div class="mt-3 m-0 row justify-content-center">
      <div class="mt-5 mt-lg-0 pt-5 pt-lg-0 col-lg-4 m-0">
        <h2>{{UserStore.data.username}}</h2>
      </div>
    </div>
    <div class="row m-0 justify-content-center">
      <div class="col-lg-4 m-0">
        <h5 class="text-muted">{{UserStore.data.email}}</h5>
      </div>
    </div>
  </div>
</template>
