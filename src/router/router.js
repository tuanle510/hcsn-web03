import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/BaseHome.vue";
import Login from "../page/BaseLogin.vue";
import store from "../store/store";
import MISAContent from "../components/layout/TheContent.vue";
import MISALisence from "../components/layout/TheLisence.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      { path: "/asset", component: MISAContent },
      { path: "/lisence", component: MISALisence },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const isAuthenticated = true;

/**
 * Mô tả : Authentic
 * @param
 * @return
 * Created by: Lê Thiện Tuấn - MF1118`
 * Created date: 21:06 01/06/2022
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.user != []) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
