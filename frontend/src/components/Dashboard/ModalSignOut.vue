<!-- eslint-disable consistent-return -->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import useAuthStore from '../../store/Auth';
import useUserStore from '../../store/User';

const AuthStore = useAuthStore();
const UserStore = useUserStore();
const Router = useRouter();

async function handleSignOut() {
  if (!(await AuthStore.SignOut())) {
    await AuthStore.VerifyToken();
    if (!AuthStore.StateAuth.isAuth) {
      UserStore.data = null;
      return Router.push('/auth/signin');
    }
  }
}
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="signOut" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="signOutLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="signOutLabel">Are you sure?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body text-center">
          <button type="button" class="btn btn-outline-danger me-3" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="handleSignOut" class="btn btn-danger" data-bs-dismiss="modal">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>
