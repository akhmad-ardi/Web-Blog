<script setup lang="ts">
import ModalSignOut from '../Dashboard/ModalSignOut.vue';
import useUserStore from '../../store/User';

const UserStore = useUserStore();
</script>

<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3 sidebar-sticky ps-2 pe-3">
      <ul class="nav flex-column p-0 m-0">
        <li class="nav-item p-0 m-0">
          <router-link class="nav-link" to="/dashboard/profile">
            <i class="bi bi-person-fill" />
            Profile
          </router-link>
        </li>
        <li class="nav-item p-0 m-0">
          <router-link class="nav-link" to="/dashboard/posts">
            <i class="bi bi-file-post" />
            Posts
          </router-link>
        </li>
        <li class="nav-item p-0 m-0">
          <router-link class="nav-link" to="/dashboard/users" v-if="UserStore.data?.isAdmin">
            <i class="bi bi-people-fill" />
            Users
          </router-link>
        </li>
        <li class="nav-item p-0 m-0">
          <router-link class="nav-link" to="/dashboard/settings">
            <i class="bi bi-gear-fill" />
            Settings
          </router-link>
        </li>
        <li class="nav-item p-0 m-0">
          <router-link class="nav-link" to="/">
            <i class="bi bi-house-door-fill" />
            Home
          </router-link>
        </li>
        <hr />
      </ul>

      <ul class="nav flex-column mb-2 ps-1">
        <li class="nav-item">
          <button type="button" class="btn btn-danger text-light w-100" data-bs-toggle="modal" data-bs-target="#signOut">
            <i class="bi bi-box-arrow-left" />
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <ModalSignOut />
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: var(--bs-primary);
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
}

</style>
