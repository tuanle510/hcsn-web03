import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/BaseHome.vue';
import MISAContent from '../components/layout/TheContent.vue';
import MISALicense from '../components/layout/TheLicense.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/asset',
    component: Home,
    children: [
      { path: '/asset', component: MISAContent },
      { path: '/license', component: MISALicense },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
