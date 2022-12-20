/* eslint-disable consistent-return */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import PostsView from '../views/PostsView.vue';
import AuthView from '../views/AuthView.vue';
import DashboardView from '../views/DashboardView.vue';
import PostsDashboardView from '../views/PostsDashboardView.vue';
import SettingsView from '../views/SettingsView.vue';

// children components
import PostsComp from '../components/Post/PostsComp.vue';
import PostComp from '../components/Post/PostComp.vue';
import SignIn from '../components/Auth/SignIn.vue';
import SignUp from '../components/Auth/SignUp.vue';
import Profile from '../components/Dashboard/ProfileComp.vue';
import PostsDashboard from '../components/Dashboard/PostsDashboard.vue';
import EditPostDashboard from '../components/Dashboard/EditPostDashboard.vue';
import AddPostDashboard from '../components/Dashboard/AddPostDashboard.vue';
import Settings from '../components/Dashboard/SettingsComp.vue';
import EditProfile from '../components/Dashboard/EditProfileComp.vue';
import EditPassword from '../components/Dashboard/EditPasswordComp.vue';
import Users from '../components/Dashboard/UsersComp.vue';

// store
import useAuthStore from '../store/Auth';
import useUserStore from '../store/User';

const routes = [
  // home
  {
    path: '/',
    component: HomeView,
  },
  // about
  {
    path: '/about',
    component: AboutView,
  },
  // posts
  {
    path: '/posts',
    component: PostsView,
    children: [
      {
        path: '',
        component: PostsComp,
      },
      {
        path: ':slug',
        component: PostComp,
      },
    ],
  },
  // auth
  {
    path: '/auth',
    component: AuthView,
    async beforeEnter(to: { fullPath: string; }) {
      const AuthStore = useAuthStore();

      if (to.fullPath === '/auth') return { name: 'SignIn' };
      if (await AuthStore.VerifyToken()) return { name: 'Dashboard' };
    },
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        component: SignIn,
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp,
      },
    ],
  },
  // dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    async beforeEnter(to: { fullPath: string; }) {
      const AuthStore = useAuthStore();
      const UserStore = useUserStore();

      if (!UserStore.data) await UserStore.GetUser();

      if (to.fullPath === '/dashboard') return { name: 'Profile' };
      if (!(await AuthStore.VerifyToken())) return { name: 'SignIn' };
    },
    children: [
      // profile
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
      // posts
      {
        path: 'posts',
        component: PostsDashboardView,
        children: [
          {
            path: '',
            component: PostsDashboard,
          },
          {
            path: 'add',
            component: AddPostDashboard,
          },
          {
            path: ':id',
            component: EditPostDashboard,
          },
        ],
      },
      // settings
      {
        path: 'settings',
        component: SettingsView,
        children: [
          {
            path: '',
            component: Settings,
          },
          {
            path: 'profile',
            component: EditProfile,
          },
          {
            path: 'password',
            component: EditPassword,
          },
        ],
      },
      // users
      {
        path: 'users',
        component: Users,
        beforeEnter() {
          const UserStore = useUserStore();
          if (!UserStore.data?.isAdmin) return { name: 'Profile' };
          return true;
        },
      },
    ],
  },
];

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(),
  routes,
});

export default router;
